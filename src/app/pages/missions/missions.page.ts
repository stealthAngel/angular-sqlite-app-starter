import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { AlertService } from 'src/app/alert.service';
import { FlipperComponent } from 'src/app/components/flipper/flipper.component';
import { MissionDto } from 'src/app/models/MissionDto';
import { MissionFilters } from 'src/app/models/missionFilter';
import { MissionRepository } from 'src/app/repositories/mission.repository';
import { MapperService } from 'src/app/services/mapper.service';
import { ToastService } from 'src/app/services/toast.service';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.page.html',
  styleUrls: ['./missions.page.scss'],
})
export class MissionsPage implements OnInit {

  missions: MissionDto[] = [];
  filteredMissions: MissionDto[] = [];

  segments: string[] = ['Card View', 'Notepad View'];

  selectedSegment: string = this.segments[0];

  //filters
  searchTerm: string = '';
  orderValue: string = '';
  orderBy: string = '';

  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;

  swiper: Swiper;

  constructor(private missionRepository: MissionRepository, private mapperService: MapperService, private changeDetectorRef: ChangeDetectorRef, private pickerController: PickerController, private alertService: AlertService, private toastService: ToastService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ missionDtos }) => {
      console.log(missionDtos);
      this.missions = missionDtos;
      this.filteredMissions = this.missions;
    });
  }

  filterMissions(missions: MissionDto[], searchTerm: string, orderBy: string, orderValue: string) {
    let filteredMissions = missions;
    if (searchTerm) {
      filteredMissions = filteredMissions.filter(mission => mission.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (orderValue) {
      filteredMissions = filteredMissions.sort((a, b) => {
        let valueA: any;
        let valueB: any;
        switch (orderValue) {
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
        if (orderBy === MissionFilters[MissionFilters.Ascending]) {
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
    this.filteredMissions = this.filterMissions(this.missions, this.searchTerm, this.orderBy, this.orderValue);
  }

  async onDeleteMissionClick(id: number) {
    let shouldDelete = await this.alertService.presentCancelOkAlert("Delete Mission", "Are you sure you want to delete this mission?");
    if (shouldDelete) {
      await this.missionRepository.deleteMissionById(id);
      this.missions = this.missions.filter(mission => mission.id !== id);
      this.toastService.show("Mission deleted");
    }
  }

  onSlideChange() {
    this.selectedSegment = this.segments[this.swiper.activeIndex];
    this.changeDetectorRef.detectChanges();
    //this.scrollToTop();
  }

  setSwiperInstance(swiper: Swiper) {
    this.swiper = swiper;
  }

  scrollToTop() {
    document.querySelector('ion-content').scrollToTop(500);
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
            this.filteredMissions = this.filterMissions(this.missions, this.searchTerm, this.orderBy, this.orderValue);
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
