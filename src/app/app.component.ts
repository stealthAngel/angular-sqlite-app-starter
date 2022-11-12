import { Component } from "@angular/core";

import { StatusBar } from "@awesome-cordova-plugins/status-bar";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { SettingRepository } from "./database/repositories/setting.repository";
import { ColorTheme, SettingType } from "./models/setting/settings.enum";
import { ThemeService } from "./services/theme-service.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform, private SettingRepository: SettingRepository, private themeService: ThemeService) {
    this.platform.ready().then(async () => {
      this.platform.backButton.subscribeWithPriority(666666, () => {
        App.exitApp();
      });

      this.setStatusBarOverlayWebView();
    });
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
