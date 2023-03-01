import fs from "fs/promises";

import sqlite3 from "sqlite3";

import { DATABASE_PATH, INITIAL_DATABASE_PATH } from "../paths.js";

export async function initialize() {
  await fs.copyFile(INITIAL_DATABASE_PATH, DATABASE_PATH);

  const db = new sqlite3.Database(DATABASE_PATH);
  const run = (sql) =>
    new Promise((resolve, reject) => {
      const res = db.run(sql);
      res.on("error", reject);
      res.on("finish", resolve);
    });

  await run("CREATE INDEX idx_race_id ON odds_item (raceId);");
}
