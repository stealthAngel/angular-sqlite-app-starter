import { NgModule } from '@angular/core';
import { CountersPageRoutingModule } from './counters-routing.module';
import { CounterRepository } from 'src/app/repositories/counter.repository';
import { MissionRepository } from 'src/app/repositories/mission.repository';
import { CountersPage } from './counters.page';
import { LibSharedModule } from 'src/app/lib/lib-shared.module';

@NgModule({
  imports: [
    CountersPageRoutingModule,
    LibSharedModule,
  ],
  providers: [
    CounterRepository,
    MissionRepository,
  ],
  declarations: [CountersPage]
})
export class CountersPageModule { }
