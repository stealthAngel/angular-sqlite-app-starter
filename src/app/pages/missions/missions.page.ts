import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { AlertService } from 'src/app/alert.service';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { MissionDto } from 'src/app/models/MissionDto';
import { MissionFilters } from 'src/app/models/missionFilter';
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

  //filters
  searchTerm: string = '';
  orderValue: string = '';
  orderBy: string = '';

  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;

  swiper: Swiper;

  constructor(private missionService: MissionService, private changeDetectorRef: ChangeDetectorRef, private pickerController: PickerController, private alertService: AlertService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.missionService.getMissions().subscribe(missions => {
      this.missions = missions;
    });
  }

  getMissions() {
    console.log(this.missions);
    let filteredMissions = this.missions;
    if (this.searchTerm) {
      filteredMissions = filteredMissions.filter(mission => mission.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    if (this.orderValue) {
      filteredMissions = filteredMissions.sort((a, b) => {
        let valueA: any;
        let valueB: any;
        switch (this.orderValue) {
          case MissionFilters[MissionFilters.Name]:
            valueA = a.name;
            valueB = b.name;
            break;
          case MissionFilters[MissionFilters.amountToDo]:
            valueA = a.countersAmountTotal;
            valueB = b.countersAmountTotal;
            break;
          case MissionFilters[MissionFilters.AmountDone]:
            valueA = a.endAmount;
            valueB = b.endAmount;
            break;
          case MissionFilters[MissionFilters.Percentage]:
            valueA = a.percentage;
            valueB = b.percentage;
            break;
          default:
            break;
        }
        if (this.orderBy === MissionFilters[MissionFilters.Ascending]) {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    return filteredMissions;
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

  async presentPicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          handler: (selected) => {
            this.orderBy = selected.orderBy.value;
            this.orderValue = selected.orderValue.value;
            this.changeDetectorRef.detectChanges();
          },
        }
      ],

      columns: [
        {
          name: 'orderValue',
          options: [
            { text: 'None', value: MissionFilters[MissionFilters.None] },
            { text: 'Name', value: MissionFilters[MissionFilters.Name] },
            { text: 'Amount to do', value: MissionFilters[MissionFilters.amountToDo] },
            { text: 'Amount done', value: MissionFilters[MissionFilters.AmountDone] },
            { text: 'Percentage', value: MissionFilters[MissionFilters.Percentage] },
          ],
        },
        {
          name: 'orderBy',
          options: [
            { text: 'Ascending', value: MissionFilters[MissionFilters.Ascending] },
            { text: 'Descending', value: MissionFilters[MissionFilters.Descending] },
          ],
        },
      ],
    });
    await picker.present();

  }

}
