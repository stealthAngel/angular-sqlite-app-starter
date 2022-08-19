export interface AppSetting {
  id: number;
  name: string;
  value: any;
}

export interface AppSettingsFindAGoodName {
  value: any;
  userText: string;
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

export interface SettingsType {
  SHOULD_SCROLL_UP: AppSettingsFindAGoodName;
  SHOW_MISSION_COMPLETED_COLOR: AppSettingsFindAGoodName;
  THEME: AppSettingsFindAGoodName;
  FONT: AppSettingsFindAGoodName;
}

let startUpSettings: SettingsType = {
  SHOULD_SCROLL_UP: {
    value: 'false',
    userText: 'Should scroll up'
  },
  SHOW_MISSION_COMPLETED_COLOR: {
    value: 'false',
    userText: 'Show mission completed color'
  },
  THEME: {
    value: ColorThemes[ColorThemes.DEFAULT],
    userText: 'Default'
  },
  FONT: {
    value: FontThemes[FontThemes.DEFAULT],
    userText: 'Default'
  }
};

export { startUpSettings };