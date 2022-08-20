import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountersPageRoutingModule } from './counters-routing.module';

import { CounterRepository } from 'src/app/repositories/counter.repository';
import { MissionRepository } from 'src/app/repositories/mission.repository';
import { CountersPage } from './counters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountersPageRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    CounterRepository,
    MissionRepository,
    FormBuilder
  ],
  declarations: [CountersPage]
})
export class CountersPageModule { }
