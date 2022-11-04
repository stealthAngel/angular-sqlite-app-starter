import { Injectable } from "@angular/core";
import { Migration } from "../models/database-models";
import { DatabaseService } from "../services/database.service";
@Injectable()
export class MigrationRepository {
  constructor(private databaseService: DatabaseService) {}

  async get(): Promise<Migration[]> {
    var migrations = await this.databaseService.executeQuery(async (db) => {
      var result = await db.query("SELECT * FROM migrations");
      return result.values as Migration[];
    });

    return migrations;
  }

  async insert(migration: Migration): Promise<number> {
    return await this.databaseService.executeQuery(async (db) => {
      var result = await db.run("INSERT INTO migrations (id, name) VALUES (?, ?)", [migration.id, migration.name]);
      return result.changes as number;
    });
  }

  async getLastMigration(): Promise<Migration | null> {
    return await this.databaseService.executeQuery(async (db) => {
      var result = await db.query("SELECT * FROM migrations ORDER BY id DESC LIMIT 1");
      return result.values.length > 0 ? (result.values[0] as Migration) : null;
    });
  }

  async deleteAllMigrations(): Promise<void> {
    return this.databaseService.executeQuery(async (db) => {
      await db.query("DELETE FROM migrations");
    });
  }
}
