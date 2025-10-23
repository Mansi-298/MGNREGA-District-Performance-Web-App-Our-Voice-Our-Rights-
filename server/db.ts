import mongoose from 'mongoose';

let isConnected = false;
let useMemoryCache = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.warn('⚠️  MONGO_URI not configured, using in-memory cache');
      useMemoryCache = true;
      isConnected = true;
      return;
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error, falling back to in-memory cache');
    console.error(error instanceof Error ? error.message : error);
    useMemoryCache = true;
    isConnected = true;
  }
}

export function isUsingMemoryCache() {
  return useMemoryCache;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (!useMemoryCache && mongoose.connection) {
    await mongoose.connection.close();
  }
  process.exit(0);
});
