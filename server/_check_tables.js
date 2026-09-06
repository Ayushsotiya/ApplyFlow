require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
    const tables = await pool.query(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
    );
    const migrations = await pool.query("SELECT name FROM pgmigrations ORDER BY id").catch(() => ({ rows: [] }));
    console.log("tables:", tables.rows.map((r) => r.tablename).join(", "));
    console.log("migrations:", migrations.rows.map((r) => r.name).join(", "));
    await pool.end();
}

main().catch((err) => {
    console.error(err.message);
    process.exit(1);
});
