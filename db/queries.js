import { pool } from "./pool.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

export async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getOneUser(username) {
  const client = await pool.connect();
  const { rows } = await client.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
  );
  const user = rows[0];
  return user;
}

export async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPassword,
  ]);
}

// createUser("Admin", process.env.LOGIN_PW);

async function testPW(username, password) {
  const client = await pool.connect();
  const { rows } = await client.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
  );
  const user = rows[0];
  const pw = user.password;
  // const hashedPassword = await bcrypt.hash(password, 10);
  const compare = await bcrypt.compare(password, pw);
  console.log(compare);
}

// testPW("Admin", "$E@rch!!");
// getOneUser("Admin");
