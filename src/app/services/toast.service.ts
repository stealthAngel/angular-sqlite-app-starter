import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async show(message: string, duration = 1500) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
