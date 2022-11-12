import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "src/app/alert.service";
import { FlipperComponent } from "src/app/components/flipper/flipper.component";
import { ToastService } from "src/app/services/toast.service";
import { Autoplay, Keyboard, Pagination, Scrollbar, Swiper, Zoom } from "swiper";
import { Mission } from "src/app/models/mission/mission";
import { filterMissions } from "src/app/models/mission/mission.filter";
import { MissionFilters } from "src/app/models/mission/missionFilter";
import { MissionService } from "src/app/models/mission/mission.service";
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

  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;
  swiper: Swiper;

  constructor(private missionService: MissionService, private changeDetectorRef: ChangeDetectorRef, private alertService: AlertService, private toastService: ToastService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.missions = (<{ missionClasses: Mission[] }>data).missionClasses;
      this.filteredMissions = this.missions;
    });
  }

  onFlip(index: number) {
    this.flippers.get(index).cardClicked();
  }

  segmentChanged(ev: any) {
    this.swiper.slideTo(this.segments.indexOf(ev.detail.value));
  }

  onSearchChange($event) {
    this.searchTerm = $event.detail.value;
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

  setSwiperInstance(swiper: Swiper) {
    this.swiper = swiper;
  }

  scrollToTop() {
    document.querySelector("ion-content").scrollToTop(500);
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
