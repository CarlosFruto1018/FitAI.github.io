import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const dbUrl = process.env.DATABASE_URL;
console.log("[db] DATABASE_URL set:", !!dbUrl, "| prefix:", dbUrl?.slice(0, 40));

const sql = neon(dbUrl!);

export const db = drizzle(sql, { schema });

export type DB = typeof db;
