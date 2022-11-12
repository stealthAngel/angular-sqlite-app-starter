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
    return SettingType[name];
  }

  private getSettingvalue(name: SettingType, value: string): FontTheme | ColorTheme | boolean {
    if (name == SettingType.FONT_THEME) {
      return FontTheme[value];
    } else if (name == SettingType.COLOR_THEME) {
      return ColorTheme[value];
    } else if (name == SettingType.SHOULD_SHOW_MISSION_COMPLETED_COLOR) {
      return value == "true";
    } else if (name == SettingType.SHOULD_SCROLL_TO_TOP) {
      return value == "true";
    }
    throw new Error("SettingType not found");
  }
}
