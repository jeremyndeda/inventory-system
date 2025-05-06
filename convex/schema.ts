import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    name: v.string(),
    category: v.string(),
    quantity: v.number(),
    status: v.union(v.literal("in_store"), v.literal("issued")),
    dateAdded: v.number(),
  }).index("by_category", ["category"]).index("by_date", ["dateAdded"]),
});