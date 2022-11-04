
export enum ColorTheme {
  DEFAULT = "default",
  DARK = "dark",
  LOLLYPOP = "lollypop",
  BROWN_BOY = "brown-boy",
  BOOTSTRAP = "bootstrap"
}

export enum FontTheme {
  DEFAULT = "DEFAULT",
  BAHN_SCRIPT = "BAHN_SCRIPT",
  DANCING_SCRIPT = "DANCING_SCRIPT"
}

export enum SettingType {
  SHOULD_SCROLL_TO_TOP = "SHOULD_SCROLL_TO_TOP",
  SHOULD_SHOW_MISSION_COMPLETED_COLOR = "SHOW_MISSION_COMPLETED_COLOR",
  COLORTHEME = "THEME",
  FONTTHEME = "FONT",
}

export class Setting {
  id: number;
  name: SettingType;
  value: FontTheme | ColorTheme | boolean;

  constructor(settingType: SettingType, value: FontTheme | ColorTheme | boolean){
    this.name = settingType;
    this.value = value;
  }
}

export interface StartUpSetting {
  name: string;
  value: FontTheme | ColorTheme | boolean;
}