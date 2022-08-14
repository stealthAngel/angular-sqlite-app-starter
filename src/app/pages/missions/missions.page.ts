import { ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { MissionDto } from 'src/app/models/MissionDto';
import { MapperService } from 'src/app/services/mapper.service';
import { MissionService } from 'src/app/services/mission.service';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  missions$: Observable<MissionDto[]>;
  segments: string[] = ['Card View', 'Notepad View'];
  selectedSegment: string = this.segments[0];
  //view children of appflipper
  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;

  swiper: Swiper;


  constructor(private missionService: MissionService, private changeDetectorRef: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.missions$ = this.missionService.missions$;
  }

  ionViewDidEnter() {

  }

  onFlip(index: number) {
    this.flippers.get(index).cardClicked();
  }

  segmentChanged(ev: any) {
    this.swiper.slideTo(this.segments.indexOf(ev.detail.value));
  }

  onSearchChange($event) {
    console.log("onSearchChange", $event.detail.value);
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

  }

}
