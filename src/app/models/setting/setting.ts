import { Setting_DB } from "src/app/database/models/database-models";
import { SettingType, FontTheme, ColorTheme } from "./settings.enum";

export class Setting {
  id: number;
  name: SettingType;
  value: FontTheme | ColorTheme | boolean;
  orderIndex: number;

  init(x: Setting_DB): Setting {
    this.id = x.id;
    //string to settingtype
    this.name = this.getSettingType(x.name);
    this.value = this.getSettingvalue(this.name, x.value);
    this.orderIndex = x.orderIndex;

    return this;
  }

  private getSettingType(name: string): SettingType {
    return name as SettingType;
  }

  private getSettingvalue(name: SettingType, value: string): FontTheme | ColorTheme | boolean {
    switch (name) {
      case SettingType.FONT_THEME:
        return value as FontTheme;
      case SettingType.COLOR_THEME:
        return value as ColorTheme;
      case SettingType.SHOULD_SHOW_MISSION_COMPLETED_COLOR:
        return value == "true";
      case SettingType.SHOULD_SCROLL_TO_TOP:
        return value == "true";
      case SettingType.SHOULD_ALERT_DELETE_COUNTER:
        return value == "true";
      case SettingType.SHOULD_ALERT_DELETE_MISSION:
        return value == "true";
      case SettingType.SHOULD_STRIKE_COMPLETED_MISSION:
        return value == "true";
    }
  }
}
