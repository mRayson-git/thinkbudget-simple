import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { DashboardComponent } from './dashboard.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetGraphComponent } from './components/budget-graph/budget-graph.component';
import { BudgetTableComponent } from './components/budget-table/budget-table.component';



@NgModule({
  declarations: [TransactionListComponent, DashboardComponent, AddTransactionComponent, BudgetGraphComponent, BudgetTableComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
