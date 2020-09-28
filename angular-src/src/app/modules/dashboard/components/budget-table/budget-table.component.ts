import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/modules/shared/models/budget';
import { BudgetService } from 'src/app/modules/shared/services/budget.service';
import { BudgetSummary } from 'src/app/modules/shared/models/budgetSummary';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css']
})
export class BudgetTableComponent implements OnInit {
  today = new Date();
  currMonth = this.today.getMonth() + 1;
  currYear = this.today.getFullYear();
  months: string[];

  budgets: Budget[];
  usedCategories: string[];
  budgetSummaries: BudgetSummary[];

  constructor(private budgetService: BudgetService) { 
    this.months = [
      'January',
      'Februaruy',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    this.usedCategories = [];
    this.budgets = [];
    this.budgetSummaries = [];
  }

  ngOnInit(): void {
    this.getMonthBudgetData();
    console.log(this.usedCategories);
  }

  // HELPER FUNCTIONS
  formatMonth(month: number): string {
    return '0' + month;
  }

  get currentMonth(){
    return this.months[this.currMonth - 1];
  }


  buildTableRows(): void {
    this.budgets.forEach(budget => {
      let year = budget.date.getFullYear().toString();
      let month = budget.date.getMonth() + 1;
      this.budgetService.getCategoryActivity(budget.categoryName, year, this.formatMonth(month)).subscribe(transactions => {
        //console.log("Budget for category: " + budget.categoryName);
        let activity: number = 0;
        let remaining: number = budget.amount;
        console.log("Found transactions for this timeframe")
        console.log(transactions);
        transactions.forEach(transaction => {
          activity += transaction.amount;
          remaining -= transaction.amount;
        });
        this.budgetSummaries.push({
          category: budget.categoryName,
          budgeted: budget.amount,
          activity: activity,
          remaining: remaining
        });
        // console.log("Current Summaries")
        // console.log(this.budgetSummaries);
      });
     
    });
  }
  
  // MAIN FUNCTIONS
  displayHelp(){
  }

  refreshBudgetDisplay(){
    this.getMonthBudgetData();
  }

  getMonthBudgetData(){
    this.budgetService.getBudgetsByTimeFrame(this.currYear.toString(), this.formatMonth(this.currMonth)).subscribe(data => {
      data.forEach(budget => {
        this.budgets.push({
          categoryName: budget.categoryName,
          date: new Date(budget.date),
          amount: <number>budget.amount
        });
      });
      this.buildTableRows();
    });
  }
}
