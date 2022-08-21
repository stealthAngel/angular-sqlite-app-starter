import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSetting, ColorThemes, FontThemes, SettingTypes } from 'src/app/models/app-setting';
import { AppSettingRepository } from 'src/app/repositories/app-setting-repository.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  appSettings: AppSetting[];
  SettingTypes = SettingTypes;
  FontThemes = FontThemes;
  ColorThemes = ColorThemes;

  constructor(private appSettingRepository: AppSettingRepository, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  test($event) {
    console.log($event);
  }

  async init() {
    this.appSettings = await this.appSettingRepository.getAppSettings();
    console.log("🚀 ~ file: settings.page.ts ~ line 27 ~ SettingsPage ~ init ~ this.appSettings", this.appSettings)
  }

  async submit() {
    console.log(this.appSettings);
    await this.appSettingRepository.updateAppSettings(this.appSettings);
    this.toastService.show("Settings saved");
    this.router.navigate(['/missions']);

  }

}
