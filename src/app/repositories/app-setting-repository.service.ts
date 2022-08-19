import { Injectable } from '@angular/core';
import { DBSQLiteValues, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { AppSetting, startUpSettings } from '../models/app-setting';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingRepository {

  constructor(private databaseService: DatabaseService) { }


  async getAppSettings(): Promise<AppSetting[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var x: DBSQLiteValues = await db.query(`select * from appSettings;`);
      return x.values as AppSetting[];
    }, 'get appsettings');
  }

  initAppSettings = async (): Promise<void> => {
    let appSettings = await this.getAppSettings();

    for (const startUpSetting of startUpSettings) {
      let hasName = appSettings.map(x => x.name).includes(startUpSetting.name);

      if (!hasName) {
        let appSetting: AppSetting = {
          id: null,
          name: startUpSetting.name,
          value: startUpSetting.value,
        };

        await this.createAppSetting(appSetting);
      }
    }
  }

  async createAppSetting(appSetting: AppSetting): Promise<void> {
    return this.databaseService.executeQuery(async (db: SQLiteDBConnection) => {
      await db.run("INSERT INTO appSettings (name, value) VALUES (?, ?);", [appSetting.name, appSetting.value]);
    }, 'create appsetting');
  }

  async updateAppSettings(appSettings: AppSetting[]): Promise<void> {
    return this.databaseService.executeQuery(async (db: SQLiteDBConnection) => {
      for (const appSetting of appSettings) {
        await db.run("UPDATE appSettings SET value = ? WHERE name = ?;", [appSetting.value, appSetting.name]);
      }
    }, 'update appsettings');
  }

  // updateAppSettings = async (settings: AppSetting[]): Promise<void> => {

  //   // add one user with statement and values              
  //   await db.open();
  //   for (let x of settings) {
  //     await db.run("UPDATE appSettings set name = ?, value = ? where id = ?;", [x.name, x.value, x.id]);
  //   }
  //   await db.close();
  // }
  // updateAppSetting = async (setting: AppSetting): Promise<void> => {

  //   // add one user with statement and values              
  //   await db.open();
  //   await db.run("UPDATE appSettings set name = ?, value = ? where id = ?;", [setting.name, setting.value, setting.id]);
  //   await db.close();
  //   await getAppSettings();
  // }
}
