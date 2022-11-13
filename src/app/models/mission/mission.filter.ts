import { Mission } from "./mission";
import { MissionFilters } from "./missionFilter";

export function filterMissions(missions: Mission[], searchTerm: string, orderBy: string, orderValue: string, completedOrNah: string) {
  let filteredMissions = missions;
  //filter by search text;
  if (searchTerm) {
    filteredMissions = filteredMissions.filter((mission) => mission.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  //filter by completed
  if (completedOrNah == "completed") {
    filteredMissions = filteredMissions.filter((mission) => mission.currentTotalAmount >= mission.targetAmount);
  } else if (completedOrNah == "notCompleted") {
    filteredMissions = filteredMissions.filter((mission) => mission.currentTotalAmount < mission.targetAmount);
  }

  //filter by order value
  if (orderValue) {
    filteredMissions = filteredMissions.sort((a, b) => {
      let valueA: any;
      let valueB: any;
      switch (MissionFilters[orderValue]) {
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
      if (MissionFilters[orderBy] === MissionFilters.Ascending) {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }

  return filteredMissions;
}
