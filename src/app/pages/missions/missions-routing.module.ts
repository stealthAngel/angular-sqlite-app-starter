import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMissionPage } from './create-mission/create-mission.page';

import { MissionsPage } from './missions.page';
import { UpdateMissionPage } from './update-mission/update-mission.page';

const routes: Routes = [
  {
    path: '',
    component: MissionsPage
  },
  {
    path: 'create',
    component: CreateMissionPage,
  },
  {
    path: 'update/:id',
    component: UpdateMissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionsPageRoutingModule { }
