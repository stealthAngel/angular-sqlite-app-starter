import { Injectable } from '@angular/core';
import { AppSettingRepository } from '../repositories/app-setting-repository';
@Injectable()

export class Migration_AppSettings_2022_05_26 {

  constructor(private appSettingRepository: AppSettingRepository) {
  }

  async migrate() {
    this.createAppSettings();
  }

  async createAppSettings() {
    await this.appSettingRepository.initAppSettings();
  }
}



