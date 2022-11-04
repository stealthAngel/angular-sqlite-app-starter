import { NgModule } from "@angular/core";
import { MissionsPageRoutingModule } from "./missions-routing.module";
import { FlipperComponent } from "src/app/components/flipper/flipper.component";
import { CounterRepository } from "src/app/database/repositories/counter.repository";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { SwiperModule } from "swiper/angular";
import { CreateMissionPage } from "./create-mission/create-mission.page";
import { MissionsPage } from "./missions.page";
import { UpdateMissionPage } from "./update-mission/update-mission.page";
import { MissionResolverService } from "src/app/services/mission-resolver.service";
import { LibSharedModule } from "src/app/lib/lib-shared.module";
@NgModule({
  imports: [MissionsPageRoutingModule, SwiperModule, LibSharedModule],
  declarations: [MissionsPage, FlipperComponent, CreateMissionPage, UpdateMissionPage],
  providers: [MissionRepository, CounterRepository, MissionResolverService],
})
export class MissionsPageModule {}
