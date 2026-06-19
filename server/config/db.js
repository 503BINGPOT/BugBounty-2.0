import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "BugBounty",
  password: "EDITH503a",
  port: 5432,
});

export default pool;