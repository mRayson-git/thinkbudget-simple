import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetcreationComponent } from './components/budgetcreation/budgetcreation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'budgetcreation', component: BudgetcreationComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transaction', component: TransactionFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
