import { Injectable } from "@angular/core";
import { AlertController, AlertInput, AnimationController, PickerColumn, PickerController } from "@ionic/angular";

//cb is a callback function
interface cb {
  (selected: any): void;
}
interface cbNumber {
  (selected: number): void;
}
interface cbDate {
  (selected: Date): void;
}

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private alertController: AlertController, private pickerController: PickerController, private animationCtrl: AnimationController) {}

  async presentCancelOkAlertForDeleteMision() {
    return await this.presentCancelOkAlert("Delete mission", "Are you sure you want to delete this mission?");
  }

  async presentCancelOkAlertForDeleteCounter() {
    return await this.presentCancelOkAlert("Delete counter", "Are you sure you want to delete this counter?");
  }

  async presentDateTimeRangeInput(handler: cb, message?: string, startDateDefaultValue?: Date, endDateDefaultValue?: Date) {
    return await this.presentCancelSaveWithInputs(
      (value) => {
        handler({ startDate: value.startDate ? new Date(value.startDate) : null, endDate: value.endDate ? new Date(value.endDate) : null });
      },
      "Enter Date and Time Range (empty value means no limit)",
      message,
      [
        {
          name: "startDate",
          type: "datetime-local",
          placeholder: "Enter date",
          value: startDateDefaultValue ? startDateDefaultValue.toLocalIsoString().slice(0, 16) : null,
        },
        {
          name: "endDate",
          type: "datetime-local",
          placeholder: "Enter date",
          value: endDateDefaultValue ? endDateDefaultValue.toLocalIsoString().slice(0, 16) : null,
        },
      ]
    );
  }

  async presentDateTimeInput(handler: cbDate, message?: string, defaultValue?: Date) {
    return await this.presentCancelSaveWithInputs(
      (value) => {
        handler(new Date(value.date));
      },
      "Enter Date and Time",
      message,
      [
        {
          name: "date",
          type: "datetime-local",
          placeholder: "Enter date",
          value: defaultValue ? defaultValue.toLocalIsoString().slice(0, 16) : null,
        },
      ]
    );
  }

  async presenNumberInput(handler: cbNumber, message?: string, defaultValue?: number) {
    return await this.presentCancelSaveWithInputs(
      (value) => {
        handler(+value.number);
      },
      "Enter number",
      message,
      [
        {
          name: "number",
          type: "number",
          placeholder: "Enter number",
          value: defaultValue,
        },
      ]
    );
  }

  async presentCancelSaveWithInputs(handler: cb, header: string, message: string, inputs: AlertInput[]) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            return false;
          },
        },
        {
          text: "Save",
          role: "save",
          handler: (value) => {
            handler(value);
          },
        },
      ],
      inputs: inputs,
      cssClass: "custom-alert",
    });

    await alert.present();
  }

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
      cssClass: "custom-picker",
      enterAnimation: this.enterAnimation(),
      leaveAnimation: this.leaveAnimation(),
    });
    await picker.present();
  }

  enterAnimation() {
    return (baseEl: any) => {
      //animate from top to bottom
      const backdropAnimation = this.animationCtrl.create().addElement(baseEl.querySelector("ion-backdrop")!).fromTo("opacity", "0.01", "var(--backdrop-opacity)");

      const wrapperAnimation = this.animationCtrl.create().addElement(baseEl.querySelector(".picker-wrapper")!).fromTo("transform", "translateY(-100%)", "translateY(0%)");

      return this.animationCtrl.create().addElement(baseEl).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(500).addAnimation([backdropAnimation, wrapperAnimation]);
    };
  }

  leaveAnimation() {
    return (baseEl: any) => {
      //animate from bottom to top
      const backdropAnimation = this.animationCtrl.create().addElement(baseEl.querySelector("ion-backdrop")!).fromTo("opacity", "var(--backdrop-opacity)", "0");

      const wrapperAnimation = this.animationCtrl.create().addElement(baseEl.querySelector(".picker-wrapper")!).fromTo("transform", "translateY(0%)", "translateY(-100%)");

      return this.animationCtrl.create().addElement(baseEl).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(500).addAnimation([backdropAnimation, wrapperAnimation]);
    };
  }
}
