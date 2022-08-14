import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MissionsPageRoutingModule } from './missions-routing.module';

import { MissionsPage } from './missions.page';
import { MissionRepository } from 'src/app/repositories/mission.repository';
import { CounterRepository } from 'src/app/repositories/counter.repository';
import { SwiperModule } from 'swiper/angular';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { CreateMissionPage } from './create-mission/create-mission.page';
import { UpdateMissionPage } from './update-mission/update-mission.page';
import { MissionService } from 'src/app/services/mission.service';
import { ToastService } from 'src/app/services/toast.service';
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
    MissionService,
    ToastService,
    FormBuilder,
  ]
})
export class MissionsPageModule { }
