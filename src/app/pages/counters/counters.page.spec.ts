import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { ActivatedRoute, Data } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Observable } from "rxjs";
import { DatabaseService } from "src/app/database/services/database.service";
import { CounterRepository } from "src/app/database/repositories/counter.repository";
import { SQLiteService } from "src/app/database/services/sqlite.service";

import { CountersPage } from "./counters.page";

describe("CountersPage", () => {
  let component: CountersPage;
  let fixture: ComponentFixture<CountersPage>;

  beforeEach(waitForAsync(() => {
    let fakeActivatedRoute = {
      data: new Observable<Data>((observer) => {
        observer.next({});
      }),
    } as ActivatedRoute;
    TestBed.configureTestingModule({
      declarations: [CountersPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, CounterRepository, DatabaseService, SQLiteService],
    }).compileComponents();

    fixture = TestBed.createComponent(CountersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
