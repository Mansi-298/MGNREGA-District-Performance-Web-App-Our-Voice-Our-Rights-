import mongoose from 'mongoose';

const PerformanceSchema = new mongoose.Schema({
  state: { type: String, required: true, index: true },
  district: { type: String, required: true, index: true },
  month: String,
  year: String,
  data: {
    type: Object,
    required: true,
  },
  lastUpdated: { type: Date, default: Date.now },
});

// Compound index for efficient querying
PerformanceSchema.index({ state: 1, district: 1 });

export const Performance = mongoose.model('Performance', PerformanceSchema);
