import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountersPageRoutingModule } from './counters-routing.module';

import { CountersPage } from './counters.page';
import { CounterRepository } from 'src/app/repositories/counter.repository';
import { MissionRepository } from 'src/app/repositories/mission.repository';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountersPageRoutingModule,
  ],
  providers: [
    MissionRepository,
    CounterRepository
  ],
  declarations: [CountersPage]
})
export class CountersPageModule { }
