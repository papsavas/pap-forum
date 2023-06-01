import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

//TODO: use t3/env
dotenv.config({ path: ".env.local" });

export default {
	connectionString: process.env.DATABASE_URL,
	schema: 'src/db/schema.ts',
	out: 'src/db/out',
} satisfies Config;

