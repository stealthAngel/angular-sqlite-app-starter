import { animate, style } from "@angular/animations";
import { Injectable } from "@angular/core";
import { AlertController, AnimationBuilder, AnimationController, PickerColumn, PickerController } from "@ionic/angular";
interface cb {
  (selected: any): void;
}

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private alertController: AlertController, private pickerController: PickerController, private animationCtrl: AnimationController) {}

  async presentCancelOkAlertForDeleteMision() {
    return await this.presentCancelOkAlert("Delete mission", "Are you sure you want to delete this mission?");
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
