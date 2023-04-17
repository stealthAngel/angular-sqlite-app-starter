import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/alert.service";
import { ToastService } from "src/app/services/toast.service";
import { Autoplay, Keyboard, Pagination, Scrollbar, Swiper, Zoom } from "swiper";
import { Mission } from "src/app/models/mission/mission";
import { filterMissions } from "src/app/models/mission/mission.filter";
import { MissionFilters } from "src/app/models/mission/missionFilter";
import { MissionService } from "src/app/models/mission/mission.service";
import { ItemReorderEventDetail } from "@ionic/angular";
Swiper.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);
@Component({
  selector: "app-missions",
  templateUrl: "./missions.page.html",
  styleUrls: ["./missions.page.scss"],
})
export class MissionsPage implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];

  segments: string[] = ["Card View", "Notepad View"];
  selectedSegment: string = this.segments[0];

  //filters
  searchTerm: string = "";
  orderValueFilter: string = "";
  orderByFilter: string = "";
  completedFilter: string = "";

  //reorder enabled
  isReorderEnabled: boolean = false;

  swiper: Swiper;

  constructor(private missionService: MissionService, private changeDetectorRef: ChangeDetectorRef, private alertService: AlertService, private toastService: ToastService, private activatedRoute: ActivatedRoute) {}

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const { from: indexFrom, to: indexTo } = ev.detail;
    ev.detail.complete();
    console.log(ev);
    console.log(this.filteredMissions);
    const previousMission = indexTo > 0 ? this.filteredMissions[indexTo - 1] : null;
    console.log(previousMission);
    const draggedMission = this.filteredMissions[indexFrom];

    //reposition draggedMission
    this.missions = this.missions.filter((mission) => mission.id !== draggedMission.id);

    if (previousMission == null) {
      this.missions.unshift(draggedMission);
    } else {
      const previousMissionIndex = this.missions.findIndex((x) => x.id === previousMission.id);
      this.missions.splice(previousMissionIndex + 1, 0, draggedMission);
    }

    // update orderIndexes
    this.missions.forEach((mission, index) => {
      mission.orderIndex = index;
    });

    this.filterMissions();

    // Signal to the framework that the reordering is complete
  }

  onMissionSettingsClick(event: any, mission: any) {
    event.stopPropagation();
    mission.isFlipped = !mission.isFlipped;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.missions = (<{ missionClasses: Mission[] }>data).missionClasses;
      this.filteredMissions = this.missions;
    });
  }

  segmentChanged(ev: any) {
    this.swiper.slideTo(this.segments.indexOf(ev.detail.value));
  }

  onSearchChange($event) {
    this.searchTerm = $event.detail.value;
    this.filterMissions();
  }

  filterMissions() {
    this.filteredMissions = filterMissions(this.missions, this.searchTerm, this.orderByFilter, this.orderValueFilter, this.completedFilter);
  }

  async onDeleteMissionClick(id: number) {
    let shouldDelete = await this.alertService.presentCancelOkAlertForDeleteMision();
    if (shouldDelete) {
      await this.missionService.deleteMissionById(id);

      this.missions = this.missions.filter((mission) => mission.id !== id);

      this.toastService.showSuccessfullyDeleted();
    }
  }

  onSlideChange() {
    this.selectedSegment = this.segments[this.swiper.activeIndex];
    this.changeDetectorRef.detectChanges();
    //this.scrollToTop();
  }

  onEditMissionClick(mission: Mission) {}

  setSwiperInstance(swiper: Swiper) {
    this.swiper = swiper;
  }

  scrollToTop() {
    document.querySelector("ion-content").scrollToTop(500);
  }

  onMissionClick(number: number) {
    //navigate to mission details page
  }

  filterOptionsPicker() {
    var handler = (selected) => {
      this.completedFilter = selected.completedFilter.value;
      this.filteredMissions = filterMissions(this.missions, this.searchTerm, this.orderByFilter, this.orderValueFilter, this.completedFilter);
    };

    var columns = [
      {
        name: "completedFilter",
        options: [
          { text: "All Missions", value: "" },
          { text: "Completed Missions", value: "completed" },
          { text: "Not Completed Missions", value: "notCompleted" },
        ],
      },
    ];
    this.alertService.showPicker(handler, columns);
  }

  async orderOptionsPicker() {
    var handler = (selected) => {
      this.orderByFilter = selected.orderByFilter.value;
      this.orderValueFilter = selected.orderValueFilter.value;
      this.filteredMissions = filterMissions(this.missions, this.searchTerm, this.orderByFilter, this.orderValueFilter, this.completedFilter);
    };

    var columns = [
      {
        name: "orderValueFilter",
        options: [
          { text: "None", value: MissionFilters[MissionFilters.None] },
          { text: "Name", value: MissionFilters[MissionFilters.Name] },
          { text: "Amount to do", value: MissionFilters[MissionFilters.amountToDo] },
          { text: "Amount done", value: MissionFilters[MissionFilters.AmountDone] },
          { text: "Percentage", value: MissionFilters[MissionFilters.Percentage] },
        ],
      },
      {
        name: "orderByFilter",
        options: [
          { text: "Ascending", value: MissionFilters[MissionFilters.Ascending] },
          { text: "Descending", value: MissionFilters[MissionFilters.Descending] },
        ],
      },
    ];

    this.alertService.showPicker(handler, columns);
  }
}
