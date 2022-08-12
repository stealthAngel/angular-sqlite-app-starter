import { ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { MissionDto } from 'src/app/models/MissionDto';
import { MissionRepository } from 'src/app/repositories/mission.repository';
import { MapperService } from 'src/app/services/mapper.service';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  missions: MissionDto[];
  segments: string[] = ['Card View', 'Notepad View'];
  selectedSegment: string = this.segments[0];
  //view children of appflipper
  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;

  swiper: Swiper;


  constructor(private missionRepository: MissionRepository, private mapperService: MapperService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.get();
  }

  onFlip(index: number) {
    console.log("🚀 ~ file: missions.page.ts ~ line 28 ~ MissionsPage ~ onFlip ~ this.flippers", this.flippers)
    this.flippers.get(index).cardClicked();
  }

  segmentChanged(ev: any) {
    this.swiper.slideTo(this.segments.indexOf(ev.detail.value));
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

  onSlideChange() {
    this.selectedSegment = this.segments[this.swiper.activeIndex];
    this.changeDetectorRef.detectChanges();
  }

  setSwiperInstance(swiper: Swiper) {
    this.swiper = swiper;
  }

  async get() {
    let missions = await this.missionRepository.getMissions();
    this.missions = missions.map(m => this.mapperService.toDto(m));
  }

}
