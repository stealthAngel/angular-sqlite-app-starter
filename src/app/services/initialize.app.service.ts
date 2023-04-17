import { SQLiteService } from "../database/services/sqlite.service";

import { Injectable } from "@angular/core";
import { MigrationService } from "../database/migrations/migrations.service";
import { SettingService } from "../models/setting/setting.service";
import { ColorTheme, SettingType } from "../models/setting/settings.enum";
import { ThemeService } from "./theme-service.service";

@Injectable()
export class InitializeAppService {
  constructor(private sqliteService: SQLiteService, private migrationService: MigrationService, private settingService: SettingService, private themeService: ThemeService) {}

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      try {
        //execute startup queries
        await this.migrationService.executeMigrations();
        console.log("executeMigrations done");
      } catch (error) {
        throw Error(`initializeAppError: ${error}`);
      }
    });

    await this.loadSettings();
  }

  async loadSettings(): Promise<boolean> {
    await this.settingService.init();
    const setting = this.settingService.getSetting(SettingType.COLOR_THEME);
    const theme = setting.value as ColorTheme;
    this.themeService.activeTheme(theme);
    return true;
  }
}
