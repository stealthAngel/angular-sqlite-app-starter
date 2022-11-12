import { Injectable } from "@angular/core";
import { SettingRepository } from "src/app/database/repositories/setting.repository";
import { Setting } from "./setting";
import { SettingServant } from "./setting.servant";
@Injectable()
export class SettingService {
  constructor(private settingRepository: SettingRepository, private settingServant: SettingServant) {}

  async getSettings() {
    var settings = await this.settingRepository.getSettings();
    return this.settingServant.toClasses(settings);
  }

  async updateSettings(settings: Setting[]) {
    var settingsDB = this.settingServant.toDBes(settings);
    return await this.settingRepository.updateSettings(settingsDB);
  }
}
