import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailService } from './services/detail.service';
import { InitializeAppService } from './services/initialize.app.service';
import { SQLiteService } from './services/sqlite.service';

import { ProductDefaultQueryRepository } from './repositories/product.default.query.repository';
import { ProductRepository } from './repositories/product.repository';
import { DatabaseService } from './services/database.service';
import { MigrationService } from './services/migrations.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Migration_2022_05_26 } from './migrations/Migration_2022_05_26';
import { Migration_AppSettings_2022_05_26 } from './migrations/Migration_AppSettings_2022_05_26';
import { CounterRepository } from './repositories/counter.repository';
import { MissionRepository } from './repositories/mission.repository';
import { MapperService } from './services/mapper.service';
import { MissionResolverService } from './services/mission-resolver.service';

export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    SQLiteService,
    DetailService,
    DatabaseService,
    InitializeAppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true
    },
    MigrationService,
    ProductRepository,
    ProductDefaultQueryRepository,
    MissionRepository,
    CounterRepository,
    MapperService,
    MissionResolverService,
    Migration_2022_05_26,
    Migration_AppSettings_2022_05_26,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
