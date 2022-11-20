import { NgModule } from "@angular/core";
import { CountersPageRoutingModule } from "./counters-routing.module";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { CountersPage } from "./counters.page";
import { LibSharedModule } from "src/app/lib/lib-shared.module";
import { CounterRepository } from "src/app/database/repositories/counter.repository";
import { LoadingBarComponent } from "src/app/components/loading-bar/loading-bar.component";

@NgModule({
  imports: [CountersPageRoutingModule, LibSharedModule],
  providers: [CounterRepository, MissionRepository],
  declarations: [CountersPage, LoadingBarComponent],
})
export class CountersPageModule {}
