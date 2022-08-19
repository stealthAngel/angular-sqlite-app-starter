import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { AppSettingRepository } from 'src/app/repositories/app-setting-repository.service';
import { EnumToArrayPipe } from 'src/app/enum-to-array.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
  ],
  declarations: [SettingsPage, EnumToArrayPipe],

  providers: [AppSettingRepository],
})
export class SettingsPageModule { }
