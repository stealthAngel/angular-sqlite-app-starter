import { Injectable } from "@angular/core";
import { AlertController, PickerColumn, PickerController } from "@ionic/angular";
import { MissionFilters } from "./models/missionFilter";
interface cb {
  (selected: any): void;
}

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private alertController: AlertController, private pickerController: PickerController) {}

  async presentCancelOkAlert(header: string, message: string): Promise<boolean> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            return false;
          },
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            return true;
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log(role);
    return role == "confirm";
  }

  async showPicker(handler: cb, columns: PickerColumn[]) {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          handler: (selected) => {
            handler(selected);
          },
        },
      ],
      columns: columns,
    });
    await picker.present();
  }
}
