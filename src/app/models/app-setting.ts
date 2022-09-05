export interface AppSetting {
  id: number;
  name: string;
  value: any;
}

export enum ColorThemes {
  DEFAULT = "default",
  DARK = "dark",
  LOLLYPOP = "lollypop",
  BROWN_BOY = "brown-boy",
  BOOTSTRAP = "bootstrap"
}

export enum FontThemes {
  DEFAULT = "default",
  BAHN_SCRIPT = "bahn-script",
  DANCING_SCRIP = "dancing-script"
}

export enum SettingTypes {
  SHOULD_SCROLL_UP = "SHOULD_SCROLL_UP",
  SHOW_MISSION_COMPLETED_COLOR = "SHOW_MISSION_COMPLETED_COLOR",
  THEME = "THEME",
  FONT = "FONT",
}

export interface startUpSetting {
  name: string;
  value: any;
}

let startUpSettings: startUpSetting[] = [
  { name: SettingTypes.SHOULD_SCROLL_UP, value: false },
  { name: SettingTypes.SHOW_MISSION_COMPLETED_COLOR, value: false },
  { name: SettingTypes.THEME, value: ColorThemes.DEFAULT },
  { name: SettingTypes.FONT, value: FontThemes.DEFAULT }
];

export { startUpSettings };