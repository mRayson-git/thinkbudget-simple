import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetcreationComponent } from './components/budgetcreation/budgetcreation.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'budgetcreation', component: BudgetcreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
