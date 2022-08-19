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

    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      console.log(appSettings);
      for (const [key, value] of Object.entries(startUpSettings)) {
        let hasName = appSettings.map(x => x.name).includes(key);
        if (!hasName) {
          await db.run("INSERT INTO appSettings (name, value) VALUES (?, ?);", [key, value.value]);
        }
      }
    });

    let x = await this.getAppSettings();
    console.log(x);

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
