import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  // RLS lives in 0001_rls.sql (hand-written). drizzle-kit only generates
  // schema DDL; it doesn't touch policies.
  verbose: true,
  strict: true,
});
