import { type InsertPerformance, type Performance } from "@shared/schema";
import type { MGNREGAMetrics } from "@shared/schema";

// In-memory cache storage interface
export interface ICacheStorage {
  getPerformanceData(district: string): Promise<{ data: MGNREGAMetrics; lastUpdated: Date } | undefined>;
  setPerformanceData(district: string, data: MGNREGAMetrics): Promise<void>;
}

// In-memory implementation
export class MemCacheStorage implements ICacheStorage {
  private cache: Map<string, { data: MGNREGAMetrics; lastUpdated: Date }>;

  constructor() {
    this.cache = new Map();
  }

  async getPerformanceData(district: string): Promise<{ data: MGNREGAMetrics; lastUpdated: Date } | undefined> {
    return this.cache.get(district);
  }

  async setPerformanceData(district: string, data: MGNREGAMetrics): Promise<void> {
    this.cache.set(district, {
      data,
      lastUpdated: new Date(),
    });
  }
}

export const memCacheStorage = new MemCacheStorage();
