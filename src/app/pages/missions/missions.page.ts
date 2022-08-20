import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { MissionDto } from 'src/app/models/MissionDto';
import { MissionService } from 'src/app/services/mission.service';
import { ToastService } from 'src/app/services/toast.service';
import { Swiper } from 'swiper';
@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  missions: MissionDto[] = [];
  segments: string[] = ['Card View', 'Notepad View'];

  selectedSegment: string = this.segments[0];

  searchTerm: string = '';

  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;

  swiper: Swiper;

  constructor(private missionService: MissionService, private changeDetectorRef: ChangeDetectorRef, private alertService: AlertService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.missionService.getMissions().subscribe(missions => {
      this.missions = missions;
    });
  }

  getMissions() {
    if (this.searchTerm != '') {
      return this.missions.filter(mission => mission.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    
    return this.missions;
  }

  onFlip(index: number) {
    this.flippers.get(index).cardClicked();
  }

  segmentChanged(ev: any) {
    this.swiper.slideTo(this.segments.indexOf(ev.detail.value));
  }

  onSearchChange($event) {
    this.searchTerm = $event.detail.value;
  }

  async onDeleteMissionClick(id: number) {
    let shouldDelete = await this.alertService.presentCancelOkAlert("Delete Mission", "Are you sure you want to delete this mission?");
    if (shouldDelete) {
      await this.missionService.deleteMission(id);
      this.toastService.show("Mission deleted");
    }
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
