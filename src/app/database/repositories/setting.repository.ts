import { Injectable } from "@angular/core";
import { DBSQLiteValues, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { Setting } from "src/app/models/setting/setting";
import { DatabaseService } from "../services/database.service";

//todo fix settings with enum type check
@Injectable({
  providedIn: "root",
})
export class SettingRepository {
  constructor(private databaseService: DatabaseService) {}

  async getSettings(): Promise<Setting[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var x: DBSQLiteValues = await db.query(`select * from settings;`);
      return x.values as Setting[];
    }, "get settings");
  }

  async createSetting(appSetting: Setting): Promise<void> {
    return this.databaseService.executeQuery(async (db: SQLiteDBConnection) => {
      await db.run("INSERT INTO settings (name, value) VALUES (?, ?);", [appSetting.name, appSetting.value]);
    }, "create appsetting");
  }

  async updateSettings(settings: Setting[]): Promise<void> {
    return this.databaseService.executeQuery(async (db: SQLiteDBConnection) => {
      for (const appSetting of settings) {
        await db.run("UPDATE settings SET value = ? WHERE name = ?;", [appSetting.value, appSetting.name]);
      }
    }, "update settings");
  }
}
