import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Data, ActivatedRoute } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Observable } from "rxjs";
import { DatabaseService } from "src/app/database/services/database.service";
import { CounterRepository } from "src/app/database/repositories/counter.repository";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { SQLiteService } from "src/app/database/services/sqlite.service";

import { MissionsPage } from "./missions.page";

describe("MissionsPage", () => {
  let component: MissionsPage;
  let fixture: ComponentFixture<MissionsPage>;

  beforeEach(waitForAsync(() => {
    let fakeActivatedRoute = {
      data: new Observable<Data>((observer) => {
        observer.next({});
      }),
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [MissionsPage],
      imports: [IonicModule.forRoot()],
      providers: [MissionRepository, DatabaseService, SQLiteService, CounterRepository, { provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
