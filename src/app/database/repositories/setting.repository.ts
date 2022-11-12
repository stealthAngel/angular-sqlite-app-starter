import { Injectable } from "@angular/core";
import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Setting_DB } from "../models/database-models";
import { DatabaseService } from "../services/database.service";

//todo fix settings with enum type check
@Injectable({
  providedIn: "root",
})
export class SettingRepository {
  constructor(private databaseService: DatabaseService) {}

  async getSettings(): Promise<Setting_DB[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var x: DBSQLiteValues = await db.query(`select * from settings;`);
      return x.values as Setting_DB[];
    });
  }

  async createSetting(setting: Setting_DB): Promise<void> {
    return this.databaseService.executeQuery(async (db: SQLiteDBConnection) => {
      await db.run("INSERT INTO settings (name, value, orderIndex) VALUES (?, ?, ?);", [setting.name, setting.value, setting.orderIndex]);
    });
  }

  async updateSettings(settings: Setting_DB[]): Promise<void> {
    return this.databaseService.executeQuery(async (db: SQLiteDBConnection) => {
      for (const setting of settings) {
        await db.run("UPDATE settings SET value = ? WHERE name = ?;", [setting.value, setting.name]);
      }
    });
  }

  async deleteSettings(): Promise<void> {
    this.databaseService.executeQuery(async (db: SQLiteDBConnection) => {
      await db.run("DELETE FROM settings;");
    });

    
  }
}
