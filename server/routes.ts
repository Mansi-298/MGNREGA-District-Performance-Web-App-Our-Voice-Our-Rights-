import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import { connectDB, isUsingMemoryCache } from "./db";
import { Performance } from "./models/Performance";
import { memCacheStorage } from "./storage";
import { STATES, DISTRICTS, fetchMGNREGAData } from "./services/mgnregaService";
import type { ReverseGeocodeResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Connect to MongoDB (or fallback to memory)
  await connectDB();

  // GET /api/states - List all states
  app.get("/api/states", async (req, res) => {
    try {
      res.json(STATES);
    } catch (error) {
      console.error('Error fetching states:', error);
      res.status(500).json({ error: 'Failed to fetch states' });
    }
  });

  // GET /api/districts/:state - List districts for a state
  app.get("/api/districts/:state", async (req, res) => {
    try {
      const { state } = req.params;
      const districts = DISTRICTS[state] || [];
      res.json(districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
      res.status(500).json({ error: 'Failed to fetch districts' });
    }
  });

  // GET /api/performance/:district - Get performance data for a district
  app.get("/api/performance/:district", async (req, res) => {
    try {
      const { district } = req.params;

      if (isUsingMemoryCache()) {
        // Use in-memory cache
        const cachedData = await memCacheStorage.getPerformanceData(district);
        
        if (cachedData) {
          const hoursSinceUpdate = (Date.now() - cachedData.lastUpdated.getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceUpdate < 24) {
            console.log(`✅ Serving cached data for ${district} (${hoursSinceUpdate.toFixed(1)} hours old)`);
            return res.json(cachedData.data);
          }
        }

        // Fetch fresh data
        console.log(`🔄 Fetching fresh data for ${district}...`);
        const freshData = await fetchMGNREGAData(district);
        await memCacheStorage.setPerformanceData(district, freshData);
        return res.json(freshData);
      } else {
        // Use MongoDB cache
        const cachedData = await Performance.findOne({ district }).sort({ lastUpdated: -1 });

        if (cachedData) {
          const hoursSinceUpdate = (Date.now() - new Date(cachedData.lastUpdated).getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceUpdate < 24) {
            console.log(`✅ Serving MongoDB cached data for ${district} (${hoursSinceUpdate.toFixed(1)} hours old)`);
            return res.json(cachedData.data);
          }
        }

        // Fetch fresh data from API
        console.log(`🔄 Fetching fresh data for ${district}...`);
        const freshData = await fetchMGNREGAData(district);

        // Update or create cache entry
        await Performance.findOneAndUpdate(
          { district },
          {
            district,
            state: freshData.stateName,
            data: freshData,
            lastUpdated: new Date(),
          },
          { upsert: true, new: true }
        );

        res.json(freshData);
      }
    } catch (error) {
      console.error('Error fetching performance data:', error);
      res.status(500).json({ error: 'Failed to fetch performance data' });
    }
  });

  // GET /api/location/reverse-geocode - Reverse geocode coordinates
  app.get("/api/location/reverse-geocode", async (req, res) => {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
      }

      // Use Nominatim API for reverse geocoding
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon,
            format: 'json',
            addressdetails: 1,
          },
          headers: {
            'User-Agent': 'MGNREGA-Dashboard/1.0',
          },
        }
      );

      const address = response.data.address;
      const result: ReverseGeocodeResult = {
        state: address.state || address.state_district || '',
        district: address.state_district || address.county || address.city || '',
        country: address.country || '',
      };

      res.json(result);
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      res.status(500).json({ error: 'Failed to reverse geocode location' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
