import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertService } from '../alert.service';
import { ToastService } from '../services/toast.service';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    AutoFocusDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AutoFocusDirective,
  ],
  providers: [
    ToastService,
    FormBuilder,
    AlertService,
  ]
})
export class LibSharedModule { }
