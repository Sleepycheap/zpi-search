import "dotenv/config";
import { Pool } from "pg";

// export const pool = new Pool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });

export const pool = new Pool({
  connectionString: process.env.DB_STRING,
});
