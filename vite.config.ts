import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Only import Replit plugins in development
let runtimeErrorOverlay: any = null;
let cartographer: any = null;
let devBanner: any = null;

if (process.env.NODE_ENV !== "production") {
  try {
    runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal");
    cartographer = await import("@replit/vite-plugin-cartographer");
    devBanner = await import("@replit/vite-plugin-dev-banner");
  } catch (e) {
    // Replit plugins not available, continue without them
  }
}

export default defineConfig({
  plugins: [
    react(),
    ...(runtimeErrorOverlay ? [runtimeErrorOverlay.default()] : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined && cartographer && devBanner
      ? [
          cartographer.cartographer(),
          devBanner.devBanner(),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
