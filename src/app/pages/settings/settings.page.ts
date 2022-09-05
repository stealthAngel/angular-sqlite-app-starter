import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSetting, ColorThemes, FontThemes, SettingTypes } from 'src/app/models/app-setting';
import { AppSettingRepository } from 'src/app/repositories/app-setting-repository';
import { ThemeService } from 'src/app/services/theme-service.service';
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

  constructor(
    private appSettingRepository: AppSettingRepository,
    private toastService: ToastService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.appSettings = await this.appSettingRepository.getAppSettings();
  }

  onChangeColorTheme($event: any, index: number) {
    this.appSettings[index].value = $event.target.value;
    this.themeService.activeTheme(this.appSettings[index].value);
  }

  async submit() {
    console.log(this.appSettings);
    await this.appSettingRepository.updateAppSettings(this.appSettings);
    this.toastService.show("Settings saved");
    this.router.navigate(['/missions']);
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>): number => {
    return 0;
  }
}
