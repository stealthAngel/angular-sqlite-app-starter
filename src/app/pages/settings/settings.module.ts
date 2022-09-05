import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { AppSettingRepository } from 'src/app/repositories/app-setting-repository';
import { EnumToArrayPipe } from 'src/app/enum-to-array.pipe';
import { ThemeService } from 'src/app/services/theme-service.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
  ],
  declarations: [SettingsPage, EnumToArrayPipe],

  providers: [AppSettingRepository, ThemeService],
})
export class SettingsPageModule { }
