import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ProfileModule } from './modules/profile/profile.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BudgetToolsModule } from './modules/budget-tools/budget-tools.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DashboardModule,
    SettingsModule,
    ProfileModule,
    BudgetToolsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
