import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SettingRepository } from "src/app/database/repositories/setting.repository";
import { Setting, ColorTheme, FontTheme, SettingType } from "src/app/models/setting/setting";
import { ThemeService } from "src/app/services/theme-service.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  settings: Setting[];
  SettingTypes = SettingType;
  FontThemes = FontTheme;
  ColorThemes = ColorTheme;

  constructor(private SettingRepository: SettingRepository, private toastService: ToastService, private router: Router, private themeService: ThemeService) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    this.settings = await this.SettingRepository.getSettings();
  }

  onChangeColorTheme($event: ColorTheme, index: number) {
    this.settings[index].value = $event;
    this.themeService.activeTheme($event);
  }

  async submit() {
    console.log(this.settings);
    await this.SettingRepository.updateSettings(this.settings);
    this.toastService.showSettingsSuccessfullySaved();
    this.router.navigate(["/missions"]);
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  };
}
