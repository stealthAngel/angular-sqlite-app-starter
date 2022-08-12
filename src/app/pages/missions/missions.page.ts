import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { Mission } from 'src/app/models/Mission';
import { MissionRepository } from 'src/app/repositories/mission.repository';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  missions: Mission[];
  selectedSegment: string = 'Notepad View';
  //view children of appflipper
  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;


  constructor(private missionRepository: MissionRepository) { }

  ngOnInit() {
    this.get();
  }

  onFlip(index: number) {
    console.log("🚀 ~ file: missions.page.ts ~ line 28 ~ MissionsPage ~ onFlip ~ this.flippers", this.flippers)
    this.flippers.get(index).cardClicked();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  onSearchChange($event) {
    console.log("onSearchChange", $event.detail.value);
  }

  onOptions() {
    console.log("onOptions");
  }

  onMissionClick(id: number) {
    console.log("onMissionClick", id);
  }

  onEditMissionClick(id: number) {
    console.log("onEditMissionClick", id);
  }
  onDeleteMissionClick(id: number) {
    console.log("onDeleteMissionClick", id);
  }

  async get() {
    this.missions = await this.missionRepository.getMissions();
    console.log(this.missions)
  }

}
