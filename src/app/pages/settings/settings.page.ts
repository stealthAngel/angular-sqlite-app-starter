import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Setting } from "src/app/models/setting/setting";
import { SettingService } from "src/app/models/setting/setting.service";
import { ColorTheme, FontTheme, SettingType } from "src/app/models/setting/settings.enum";
import { ThemeService } from "src/app/services/theme-service.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  settings: Setting[];
  SettingTypes = SettingType;
  FontThemes = FontTheme;
  ColorThemes = ColorTheme;
  originalEnumOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  };

  constructor(private settingService: SettingService, private toastService: ToastService, private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.settings = this.settingService.getSettings();
  }

  onChangeColorTheme($event: ColorTheme, index: number) {
    this.settings[index].value = $event;
    this.themeService.activeTheme($event);
  }

  async submit() {
    await this.settingService.updateSettings(this.settings);

    this.toastService.showSettingsSuccessfullySaved();

    this.router.navigate(["/missions"]);
  }
}
