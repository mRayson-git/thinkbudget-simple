import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetToolsComponent } from './budget-tools.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { BuildBudgetComponent } from './components/build-budget/build-budget.component';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [BudgetToolsComponent, AddCategoryComponent, BuildBudgetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class BudgetToolsModule { }
