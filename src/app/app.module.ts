import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DetailService } from "./services/detail.service";
import { InitializeAppService } from "./services/initialize.app.service";
import { SQLiteService } from "./database/services/sqlite.service";

import { MigrationService } from "./database/migrations/migrations.service";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MissionRepository } from "./database/repositories/mission.repository";
import { CounterRepository } from "./database/repositories/counter.repository";
import { MigrationRepository } from "./database/repositories/migration.repository";
import { MissionServant } from "./models/mission/mission.servant";
import { MissionService } from "./models/mission/mission.service";
import { CounterService } from "./models/counter/counter.service";
import { CounterServant } from "./models/counter/counter.servant";
import { CountersCalculationServant } from "./models/counter/counters-calculation.servant";
import { DatabaseService } from "./database/services/database.service";
import { DatabaseImplementationService } from "./database/services/database-implementation.service";

export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule],
  providers: [
    SQLiteService,
    DetailService,
    { provide: DatabaseService, useClass: DatabaseImplementationService },
    InitializeAppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true,
    },
    //migration
    MigrationService,

    // services
    MissionService,
    CounterService,

    //servants
    CounterServant,
    MissionServant,
    CountersCalculationServant,

    //repositories
    MissionRepository,
    CounterRepository,
    MigrationRepository,
    MissionServant,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
