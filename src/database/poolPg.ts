import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  database: 'dbapi',
  max: 5,
  host: 'localhost',
  port: 5432,
  password: 'postgres123',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export { pool };
