import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// MGNREGA Performance Data Schema
export const performanceData = pgTable("performance_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  state: text("state").notNull(),
  district: text("district").notNull(),
  month: text("month"),
  year: text("year"),
  data: jsonb("data").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertPerformanceSchema = createInsertSchema(performanceData).omit({
  id: true,
  lastUpdated: true,
});

export type InsertPerformance = z.infer<typeof insertPerformanceSchema>;
export type Performance = typeof performanceData.$inferSelect;

// TypeScript interfaces for MGNREGA data structures
export interface MGNREGAMetrics {
  totalEmployed: number;
  totalWagesPaid: number;
  personDaysGenerated: number;
  workCompleted: number;
  totalExpenditure: number;
  districtName: string;
  stateName: string;
  lastUpdated?: string;
}

export interface StateInfo {
  code: string;
  name: string;
  nameHindi?: string;
  nameMarathi?: string;
}

export interface DistrictInfo {
  code: string;
  name: string;
  state: string;
  nameHindi?: string;
  nameMarathi?: string;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface ReverseGeocodeResult {
  state: string;
  district: string;
  country: string;
}
