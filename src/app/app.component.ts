import { Component } from "@angular/core";

import { StatusBar } from "@awesome-cordova-plugins/status-bar";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { settings_migration_2022_05_26 } from "./database/migrations/migrations/settings.migration.2022-05-26";
import { SettingRepository } from "./database/repositories/setting.repository";
import { DatabaseService } from "./database/services/database.service";
import { SettingService } from "./models/setting/setting.service";
import { ColorTheme, SettingType } from "./models/setting/settings.enum";
import { ThemeService } from "./services/theme-service.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();

    this.platform.backButton.subscribeWithPriority(666666, () => {
      App.exitApp();
    });

    this.setStatusBarOverlayWebView();
  }

  setStatusBarOverlayWebView() {
    const capacitorPlatform = Capacitor.getPlatform();

    if (capacitorPlatform !== "web") {
      StatusBar.overlaysWebView(false);
    }
  }
}
