import { Mission } from "src/app/models/mission/mission";
import { MissionFilters } from "src/app/models/mission/missionFilter";

export class MissionFilter {
  public missions: Mission[];
  public filteredMissions: Mission[];
  private _isFiltered: boolean = false;
  private _searchTerm: string = "";
  private _orderValueFilter: string = "";
  private _orderByFilter: string = "";
  private _completedFilter: string = "";

  constructor(missions: Mission[]) {
    this.missions = missions;
    this.filteredMissions = missions;
  }

  public resetFilter() {
    this._isFiltered = false;
    this._searchTerm = "";
    this._orderValueFilter = "";
    this._orderByFilter = "";
    this._completedFilter = "";
    this.filteredMissions = this.missions;
  }

  public applyFilters() {
    this.filteredMissions = this.missions;
    //filter by search text;
    if (this._searchTerm) {
      this.filteredMissions = this.filteredMissions.filter((mission) => mission.name.toLowerCase().includes(this._searchTerm.toLowerCase()));
    }

    //filter by completed
    if (this._completedFilter == "completed") {
      this.filteredMissions = this.filteredMissions.filter((mission) => mission.currentTotalAmount >= mission.targetAmount);
    } else if (this._completedFilter == "notCompleted") {
      this.filteredMissions = this.filteredMissions.filter((mission) => mission.currentTotalAmount < mission.targetAmount);
    }

    //filter by order value
    if (this._orderValueFilter) {
      this.filteredMissions = this.filteredMissions.sort((a, b) => {
        let valueA: any;
        let valueB: any;
        switch (MissionFilters[this._orderValueFilter]) {
          case MissionFilters.Name:
            valueA = a.name;
            valueB = b.name;
            break;
          case MissionFilters.amountToDo:
            valueA = a.currentTotalAmount;
            valueB = b.currentTotalAmount;
            break;
          case MissionFilters.AmountDone:
            valueA = a.targetAmount;
            valueB = b.targetAmount;
            break;
          case MissionFilters.Percentage:
            valueA = a.percentage;
            valueB = b.percentage;
            break;
          default:
            break;
        }
        if (MissionFilters[this._orderByFilter] === MissionFilters.Ascending) {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    // set isFiltered to true if any filters have been applied
    this._isFiltered = (this._searchTerm || this._completedFilter || this._orderValueFilter) !== "";
  }

  private updateFilter() {
    this.applyFilters();
  }

  get isFiltered(): boolean {
    return this._isFiltered;
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.updateFilter();
  }

  get orderValueFilter(): string {
    return this._orderValueFilter;
  }

  set orderValueFilter(value: string) {
    this._orderValueFilter = value;
    this.updateFilter();
  }

  get orderByFilter(): string {
    return this._orderByFilter;
  }

  set orderByFilter(value: string) {
    this._orderByFilter = value;
    this.updateFilter();
  }

  get completedFilter(): string {
    return this._completedFilter;
  }

  set completedFilter(value: string) {
    this._completedFilter = value;
    this.updateFilter();
  }
}
