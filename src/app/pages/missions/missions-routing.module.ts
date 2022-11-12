import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MissionResolverService } from "src/app/models/mission/mission-resolver.service";
import { CreateMissionPage } from "./create-mission/create-mission.page";

import { MissionsPage } from "./missions.page";
import { UpdateMissionPage } from "./update-mission/update-mission.page";

const routes: Routes = [
  {
    path: "",
    component: MissionsPage,
    resolve: {
      missionClasses: MissionResolverService,
    },
  },
  {
    path: "create",
    component: CreateMissionPage,
  },
  {
    path: "update/:id",
    component: UpdateMissionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionsPageRoutingModule {}
