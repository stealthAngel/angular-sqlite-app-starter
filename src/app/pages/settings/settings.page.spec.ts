import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { SettingRepository } from "src/app/database/repositories/app-setting-repository";
import { DatabaseService } from "src/app/database/services/database.service";
import { SQLiteService } from "src/app/database/services/sqlite.service";

import { SettingsPage } from "./settings.page";

describe("SettingsPage", () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPage],
      imports: [IonicModule.forRoot()],
      providers: [SettingRepository, DatabaseService, SQLiteService],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
