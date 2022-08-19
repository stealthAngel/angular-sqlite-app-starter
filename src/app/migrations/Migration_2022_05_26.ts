import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/database.service';
@Injectable()

export class Migration_2022_05_26 {

  constructor(private database: DatabaseService) {
  }

  async migrate() {
    await this.database.executeQuery(async (db) => {
      await db.execute("PRAGMA foreign_keys=ON;");
      await db.execute(createSchemas);

    });
  }
}


export const createSchemas: string = `
CREATE TABLE IF NOT EXISTS counters (
  id INTEGER PRIMARY KEY NOT NULL,
  missionId INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  createdAt timestamp DATE DEFAULT (datetime('now','localtime')),
  FOREIGN KEY (missionId) REFERENCES missions(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS appSettings (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    value TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS missions (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    endAmount INTEGER,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS MissionsCategories (
      id INTEGER PRIMARY KEY NOT NULL,
      missionId INTEGER NOT NULL,
      categoryId INTEGER NOT NULL,
      FOREIGN KEY (missionId) REFERENCES missions(id) ON DELETE SET DEFAULT
      FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET DEFAULT
    );

    CREATE TABLE IF NOT EXISTS appSettings (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      orderIndex INTEGER NOT NULL
    );
`;



