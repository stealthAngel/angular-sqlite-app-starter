import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/alert.service";
import { ToastService } from "src/app/services/toast.service";
import { Autoplay, Keyboard, Pagination, Scrollbar, Swiper, Zoom } from "swiper";
import { Mission } from "src/app/models/mission/mission";
import { MissionFilters } from "src/app/models/mission/missionFilter";
import { MissionService } from "src/app/models/mission/mission.service";
import { IonSearchbar, ItemReorderEventDetail } from "@ionic/angular";
import { MissionFilter } from "src/app/models/mission/mission.filter";
Swiper.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);
@Component({
  selector: "app-missions",
  templateUrl: "./missions.page.html",
  styleUrls: ["./missions.page.scss"],
})
export class MissionsPage implements OnInit {
  missionFilter: MissionFilter;
  segments: string[] = ["Card View", "Notepad View"];
  selectedSegment: string = this.segments[0];
  @ViewChild("mySearchbar", { static: false }) searchbar: IonSearchbar;
  //reorder enabled
  isReorderEnabled: boolean = false;

  swiper: Swiper;

  constructor(private missionService: MissionService, private changeDetectorRef: ChangeDetectorRef, private alertService: AlertService, private toastService: ToastService, private activatedRoute: ActivatedRoute) {}

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    const { from: indexFrom, to: indexTo } = ev.detail;

    const draggedMission = this.missionFilter.filteredMissions[indexFrom];
    const missionThatWasThere = this.missionFilter.filteredMissions[indexTo];

    const draggedMissionId = draggedMission.id;
    const missionThatWasThereId = missionThatWasThere.id;

    const savedDraggedMissionIndex = this.missionFilter.missions.findIndex((mission) => mission.id === draggedMissionId);
    const savedMissionThatWasThereIndex = this.missionFilter.missions.findIndex((mission) => mission.id === missionThatWasThereId);

    // Move dragged mission to its new position in the array
    this.missionFilter.missions.splice(savedMissionThatWasThereIndex, 0, this.missionFilter.missions.splice(savedDraggedMissionIndex, 1)[0]);

    // Update order indexes for all missions
    this.missionFilter.missions.forEach((mission, index) => {
      mission.orderIndex = index;
    });

    this.missionService.reOrderMissions(this.missionFilter.missions);

    this.missionFilter.filter();
    // Signal to the framework that the reordering is complete
    ev.detail.complete();
  }

  onMissionSettingsClick(event: any, mission: any) {
    event.stopPropagation();
    mission.isFlipped = !mission.isFlipped;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      const missions = (<{ missionClasses: Mission[] }>data).missionClasses;
      this.missionFilter = new MissionFilter(missions);
    });
  }

  resetFilter() {
    this.searchbar.value = "";
    this.missionFilter.resetFilter();
  }

  segmentChanged(ev: any) {
    this.swiper.slideTo(this.segments.indexOf(ev.detail.value));
  }

  onSearchChange($event) {
    this.missionFilter.searchTerm = $event.detail.value;
  }

  async onDeleteMissionClick(id: number) {
    let shouldDelete = await this.alertService.presentCancelOkAlertForDeleteMision();
    if (shouldDelete) {
      await this.missionService.deleteMissionById(id);

      // this.missions = this.missions.filter((mission) => mission.id !== id);

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
      this.missionFilter.completedFilter = selected.completedFilter.value;
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
      this.missionFilter.orderByFilter = selected.orderByFilter.value;
      this.missionFilter.orderValueFilter = selected.orderValueFilter.value;
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
