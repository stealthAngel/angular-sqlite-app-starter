import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DetailService } from "./services/detail.service";
import { InitializeAppService } from "./services/initialize.app.service";
import { SQLiteService } from "./database/services/sqlite.service";

import { DatabaseService } from "./database/services/database.service";
import { MigrationService } from "./database/migrations/migrations.service";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MapperService } from "./services/mapper.service";
import { MissionRepository } from "./database/repositories/mission.repository";
import { CounterRepository } from "./database/repositories/counter.repository";
import { MigrationRepository } from "./database/repositories/migration.repository";
import { MissionGate } from "./gate/mission.servant";

export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule],
  providers: [
    SQLiteService,
    DetailService,
    DatabaseService,
    InitializeAppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true,
    },
    MigrationService,
    MissionRepository,
    CounterRepository,
    MapperService,
    MigrationRepository,
    MissionGate,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
