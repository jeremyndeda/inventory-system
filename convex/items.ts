import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addItem = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    quantity: v.number(),
    dateAdded: v.number(),
  },
  handler: async (ctx, args) => {
    const itemId = await ctx.db.insert("items", {
      name: args.name,
      category: args.category,
      quantity: args.quantity,
      status: "in_store",
      dateAdded: args.dateAdded,
    });
    return itemId;
  },
});

export const issueItem = mutation({
  args: {
    id: v.id("items"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new Error("Item not found");
    if (item.quantity < args.quantity) throw new Error("Insufficient quantity");

    await ctx.db.patch(args.id, {
      quantity: item.quantity - args.quantity,
      status: item.quantity - args.quantity === 0 ? "issued" : item.status,
    });
  },
});

export const getItems = query({
  args: {
    category: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Filter by both category and date
    if (args.category && args.startDate !== undefined && args.endDate !== undefined) {
      const itemsByCategory = await ctx.db
        .query("items")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
      return itemsByCategory.filter(
        (item) => item.dateAdded >= args.startDate! && item.dateAdded <= args.endDate!
      );
    }

    // Filter by category only
    if (args.category) {
      return await ctx.db
        .query("items")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }

    // Filter by date only
    if (args.startDate !== undefined && args.endDate !== undefined) {
      return await ctx.db
        .query("items")
        .withIndex("by_date", (q) =>
          q.gte("dateAdded", args.startDate!).lte("dateAdded", args.endDate!)
        )
        .collect();
    }

    // No filters
    return await ctx.db.query("items").collect();
  },
});
