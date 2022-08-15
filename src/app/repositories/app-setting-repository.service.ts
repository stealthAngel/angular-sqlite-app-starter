import { Injectable } from '@angular/core';
import { DBSQLiteValues, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { AppSetting } from '../models/app-setting';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingRepository {

  constructor(private databaseService: DatabaseService) { }


  async getAppSettings(): Promise<AppSetting[]> {
    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      var x: DBSQLiteValues = await db.query(`select * from appSettings order by orderIndex;`);
      return x.values as AppSetting[];
    }, 'get appsettings');
  }

  initAppSettings = async (): Promise<void> => {

    // let startUpSettings: AppSetting[] = [
    //   { id: 1, name: settingTypes.SHOULD_SCROLL_UP, value: 'false', orderIndex: 1 },
    //   { id: 2, name: settingTypes.SHOW_MISSION_COMPLETED_COLOR, value: 'false', orderIndex: 2 },
    //   { id: 3, name: settingTypes.THEME, value: colorThemes.DEFAULT, orderIndex: 3 },
    //   { id: 4, name: settingTypes.FONT, value: fontThemes.DEFAULT, orderIndex: 4 }
    // ];

    return this.databaseService.executeQuery<any>(async (db: SQLiteDBConnection) => {
      let appSettings = await this.getAppSettings();
      for (let x of appSettings) {
        if (!appSettings.map(x => x.name).includes(x.name)) {
          await db.run("INSERT INTO appSettings (name, value, orderIndex) VALUES (?, ?, ?);", [x.name, x.value, x.orderIndex]);
        }
      }
    });

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
