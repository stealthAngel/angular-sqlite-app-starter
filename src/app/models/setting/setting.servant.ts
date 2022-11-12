import { Injectable } from "@angular/core";
import { Setting_DB } from "src/app/database/models/database-models";
import { Setting } from "./setting";

@Injectable()
export class SettingServant {
  constructor() {}

  toClass(x: Setting_DB): Setting {
    return new Setting().init(x);
  }

  toClasses(x: Setting_DB[]): Setting[] {
    return x.map((y) => this.toClass(y));
  }

  toDB(x: Setting): Setting_DB {
    return {
      id: x.id,
      name: x.name.toString(),
      value: x.value.toString(),
      orderIndex: x.orderIndex,
    };
  }

  toDBes(x: Setting[]): Setting_DB[] {
    return x.map((y) => this.toDB(y));
  }
}
