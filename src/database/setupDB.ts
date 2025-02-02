import fs from "fs";
import path from "path";
import pool from "./DB";

const runSQLFile = async (filePath: string) => {
  try {
    const sql = fs.readFileSync(filePath, "utf-8");
    const commands = sql.split(";").filter((cmd) => cmd.trim() !== ""); // Erota SQL-komennot
    const conn = await pool.getConnection();

    for (const command of commands) {
      await conn.query(command); // Suorita jokainen komento erikseen
    }

    console.log("Database setup completed.");
    conn.release();
  } catch (error) {
    console.error("Error executing SQL file:", error);
  }
};

const setupDatabase = async () => {
  const filePath = path.join(__dirname, "../../setup.sql"); // Oikea polku setup.sql-tiedostoon
  await runSQLFile(filePath);
};

setupDatabase();
