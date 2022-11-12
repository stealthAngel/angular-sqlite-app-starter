import { Component } from "@angular/core";

import { StatusBar } from "@awesome-cordova-plugins/status-bar";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { settings_migration_2022_05_26 } from "./database/migrations/migrations/settings.migration.2022-05-26";
import { SettingRepository } from "./database/repositories/setting.repository";
import { DatabaseService } from "./database/services/database.service";
import { ColorTheme, SettingType } from "./models/setting/settings.enum";
import { ThemeService } from "./services/theme-service.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform, private SettingRepository: SettingRepository, private a: DatabaseService, private themeService: ThemeService) {
    this.platform.ready().then(async () => {
      this.platform.backButton.subscribeWithPriority(666666, () => {
        App.exitApp();
      });

      this.setStatusBarOverlayWebView();
    });
    this.do();
  }

  async do() {
    //todo make both calls work in parallel
    await this.SettingRepository.deleteSettings();
    await new settings_migration_2022_05_26(this.a).up();
  }

  setStatusBarOverlayWebView() {
    const capacitorPlatform = Capacitor.getPlatform();

    if (capacitorPlatform !== "web") {
      StatusBar.overlaysWebView(false);
    }
  }

  async loadAppSettings() {
    var settings = await this.SettingRepository.getSettings();
    var setting = settings.find((x) => x.name == SettingType.COLOR_THEME);
    var theme = setting.value as ColorTheme;
    this.themeService.activeTheme(theme);
  }
}
