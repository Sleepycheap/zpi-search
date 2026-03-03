import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255),
password VARCHAR (255)
);`;

async function main() {
  try {
    console.log('Seeding...');
    const client = new Client({
      connectionString:
        'postgresql://anthonyauthier:082015@localhost:5432/zpisearch_users',
    });
    await client.connect();
    await client.end();
    console.log('done');
  } catch (err) {
    console.log(err);
  }
}

main();
