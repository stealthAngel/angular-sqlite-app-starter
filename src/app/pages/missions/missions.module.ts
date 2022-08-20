import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionsPageRoutingModule } from './missions-routing.module';

import { AlertService } from 'src/app/alert.service';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { CounterRepository } from 'src/app/repositories/counter.repository';
import { MissionRepository } from 'src/app/repositories/mission.repository';
import { ToastService } from 'src/app/services/toast.service';
import { SwiperModule } from 'swiper/angular';
import { CreateMissionPage } from './create-mission/create-mission.page';
import { MissionsPage } from './missions.page';
import { UpdateMissionPage } from './update-mission/update-mission.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MissionsPageRoutingModule,
    SwiperModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MissionsPage,
    FlipperComponent,
    CreateMissionPage,
    UpdateMissionPage,
  ],
  providers: [
    MissionRepository,
    CounterRepository,
    ToastService,
    FormBuilder,
    AlertService,
  ]
})
export class MissionsPageModule { }
