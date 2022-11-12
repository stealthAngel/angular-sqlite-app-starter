import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async show(message: string, duration = 1500) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
    });
    toast.present();
  }

  async showSuccessfullyCreated() {
    this.show("Successfully created");
  }

  async showSuccessFullyUpdated() {
    this.show("Successfully updated");
  }

  async showSuccessfullyDeleted() {
    this.show("Successfully deleted");
  }

  async showSuccessfullySaved() {
    this.show("Successfully saved");
  }

  async showSettingsSuccessfullySaved() {
    this.show("Settings successfully saved");
  }
}
