export interface AppSetting {
  id: number;
  name: string;
  value: any;
}

export enum ColorThemes {
  DEFAULT,
  DARK,
  LOLLYPOP,
  BROWN_BOY,
  BOOTSTRAP,
}

export enum FontThemes {
  DEFAULT,
  BAHN_SCRIPT,
  DANCING_SCRIPT
}

export enum SettingTypes {
  SHOULD_SCROLL_UP,
  SHOW_MISSION_COMPLETED_COLOR,
  THEME,
  FONT
}

export interface startUpSetting {
  name: string;
  value: any;
}

let startUpSettings: startUpSetting[] = [
  { name: SettingTypes[SettingTypes.SHOULD_SCROLL_UP], value: false },
  { name: SettingTypes[SettingTypes.SHOW_MISSION_COMPLETED_COLOR], value: false },
  { name: SettingTypes[SettingTypes.THEME], value: ColorThemes[ColorThemes.DEFAULT] },
  { name: SettingTypes[SettingTypes.FONT], value: FontThemes[FontThemes.DEFAULT] }
];

export { startUpSettings };