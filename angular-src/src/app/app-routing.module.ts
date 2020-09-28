import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SettingsComponent } from  './modules/settings/settings.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginPageComponent } from './modules/profile/components/login-page/login-page.component';
import { SignupPageComponent } from './modules/profile/components/signup-page/signup-page.component';
import { BudgetToolsComponent } from './modules/budget-tools/budget-tools.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'budget-tools', component: BudgetToolsComponent },
  { path: '', redirectTo: '/homepage', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
