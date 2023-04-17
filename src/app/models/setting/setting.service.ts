import { Injectable } from "@angular/core";
import { SettingRepository } from "src/app/database/repositories/setting.repository";
import { Setting } from "./setting";
import { SettingServant } from "./setting.servant";
import { SettingType } from "./settings.enum";

@Injectable()
export class SettingService {
  // dictionary of settingstype
  private settingTypes: { [key: string]: Setting } = {
    [SettingType.FONT_THEME.toString()]: null,
    [SettingType.COLOR_THEME.toString()]: null,
    [SettingType.SHOULD_SHOW_MISSION_COMPLETED_COLOR.toString()]: null,
    [SettingType.SHOULD_SCROLL_TO_TOP.toString()]: null,
    [SettingType.SHOULD_ALERT_DELETE_COUNTER.toString()]: null,
    [SettingType.SHOULD_ALERT_DELETE_MISSION.toString()]: null,
  };

  constructor(private settingRepository: SettingRepository, private settingServant: SettingServant) {}

  getSetting(key: string): Setting {
    if (this.settingTypes.hasOwnProperty(key)) {
      return this.settingTypes[key];
    }
    throw new Error("SettingType not found");
  }

  getSettings(): Setting[] {
    return Object.values(this.settingTypes);
  }

  async init() {
    const settings = await this.getSettingsFromDatabase();
    settings.forEach((setting) => {
      this.settingTypes[setting.name.toString()] = setting;
    });
  }

  private async getSettingsFromDatabase(): Promise<Setting[]> {
    var settings = await this.settingRepository.getSettings();
    return this.settingServant.toClasses(settings);
  }

  async updateSettings(settings: Setting[]): Promise<void> {
    var settingsDB = this.settingServant.toDBes(settings);
    await this.settingRepository.updateSettings(settingsDB);
    this.init();
  }
}
