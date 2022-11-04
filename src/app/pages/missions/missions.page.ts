import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PickerController } from "@ionic/angular";
import { AlertService } from "src/app/alert.service";
import { FlipperComponent } from "src/app/components/flipper/flipper.component";
import { MissionFilters } from "src/app/models/missionFilter";
import { MissionRepository } from "src/app/database/repositories/mission.repository";
import { ToastService } from "src/app/services/toast.service";
import { Autoplay, Keyboard, Pagination, Scrollbar, Swiper, Zoom } from "swiper";
import { MissionClass } from "src/app/models/mission";
import { MissionGate } from "src/app/gate/mission.servant";
import { filterMissions } from "src/app/models/mission.filter";
Swiper.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);
@Component({
  selector: "app-missions",
  templateUrl: "./missions.page.html",
  styleUrls: ["./missions.page.scss"],
})
export class MissionsPage implements OnInit {
  missions: MissionClass[] = [];
  filteredMissions: MissionClass[] = [];

  segments: string[] = ["Card View", "Notepad View"];
  selectedSegment: string = this.segments[0];

  //filters
  searchTerm: string = "";
  orderValueFilter: string = "";
  orderByFilter: string = "";
  completedFilter: string = "";

  @ViewChildren(FlipperComponent) flippers: QueryList<FlipperComponent>;
  swiper: Swiper;

  constructor(private missionRepository: MissionRepository, private missionGate: MissionGate, private changeDetectorRef: ChangeDetectorRef, private pickerController: PickerController, private alertService: AlertService, private toastService: ToastService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.missions = (<{ missionClasses: MissionClass[] }>data).missionClasses;
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
    let shouldDelete = await this.alertService.presentCancelOkAlert("Delete Mission", "Are you sure you want to delete this mission?");
    if (shouldDelete) {
      await this.missionRepository.deleteMissionById(id);

      this.missions = this.missions.filter((mission) => mission.id !== id);

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
