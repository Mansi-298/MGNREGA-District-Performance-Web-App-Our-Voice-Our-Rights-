import { createServer as createViteServer } from 'vite';
import { type Express, type Server } from 'express';
import express from 'express';
import path from 'path';

export function log(message: string, source = "express") {
  console.log(`[${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: path.resolve(import.meta.dirname, '..', 'client'),
  });

  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const clientDistPath = path.resolve(import.meta.dirname, '..', 'dist', 'public');
  
  // Serve static files from the built frontend
  app.use(express.static(clientDistPath));
  
  // Catch-all handler: send back React's index.html file for any non-API routes
  app.get('*', (req, res) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}
