import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ParserProfileComponent } from './components/parser-profile/parser-profile.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ParserProfileDetailComponent } from './components/parser-profile-detail/parser-profile-detail.component';
import { UserAccountDetailComponent } from './components/user-account-detail/user-account-detail.component';



@NgModule({
  declarations: [SettingsComponent, ParserProfileComponent, ParserProfileDetailComponent, UserAccountDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
