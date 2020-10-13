import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetcreationComponent } from './components/budgetcreation/budgetcreation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'budgetcreation', component: BudgetcreationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transaction', component: TransactionFormComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
