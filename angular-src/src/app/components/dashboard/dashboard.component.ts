import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Budget } from 'src/app/models/budget';
import { Transaction } from 'src/app/models/transaction';
import { BudgetService } from 'src/app/services/budget.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  budget: Budget;
  transactions: Transaction[];
  activity: {
    categoryName: string,
    categoryBudget: number,
    categoryActivity: number,
    percent?: number,
    categoryType?: string
  }[];
  userEmail: string;
  today: Date;
  constructor(
    public auth: AuthService,
    private budgetService: BudgetService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.today = new Date();
    let timeframe = this.today.toISOString().slice(0,7);
    this.activity = [];
    this.auth.user$.subscribe(user => {
      this.userEmail = user.email;
      this.budgetService.getBudgetByName(user.email).subscribe(budget => {
        this.budget = budget;
      });
      this.transactionService.getTransactionsInTimeframe(this.userEmail, timeframe).subscribe(transactions => {
        this.transactions = transactions;
        this.getActivity();
        console.log(this.activity);
        this.createPieChart();
      });
    });
  }

  // for each category in the budget, collect the total activity in the transactions
  getActivity() {
    let totalActivity = 0;
    // for each category in the budget
    this.budget.budgetCategories.forEach(category => {
      let categoryActivity = 0;
      // for each transaction
      this.transactions.forEach(transaction => {
        if (transaction.transactionCategory === category.categoryName) {
          categoryActivity += transaction.transactionAmount;
        }
      });
      let percent = (categoryActivity / category.categoryAmount) * 100;
      let type = 'success';
      if (percent > 100) {
        type = 'danger';
      } else if (percent >= 80) {
        type = 'warning';
      }
      // puch the new category object into the activity array
      this.activity.push({
        categoryName: category.categoryName,
        categoryBudget: category.categoryAmount,
        categoryActivity: categoryActivity,
        percent: Math.floor(percent),
        categoryType: type
      });
    });
    this.transactions.forEach(transaction => {
      totalActivity += transaction.transactionAmount;
    });
    let percent = (totalActivity / this.budget.budgetTotal) * 100;
    let type = 'success';
      if (percent > 100) {
        type = 'danger';
      } else if (percent >= 80) {
        type = 'warning';
      }
    this.activity.push({
      categoryName: 'Total',
      categoryBudget: this.budget.budgetTotal,
      categoryActivity: totalActivity,
      percent: Math.floor(percent),
      categoryType: type
    });
  }

  getCategoryActvitiy(categoryName: string) {
    let chosenCategory;
    this.activity.forEach(category => {
      if (category.categoryName === categoryName){
        chosenCategory = category;
      }
    });
    return chosenCategory;
  }

  createPieChart(){
    let labels = [];
    let data = [];
    // add all the categories and their activity
    this.activity.forEach(category => {
      if (category.categoryName !== 'Total') {
        labels.push(category.categoryName);
        data.push(category.categoryActivity);
      }
    });
    // add the remaining budget left
    labels.push("Budget Remaining");
    data.push(this.getCategoryActvitiy('Total').categoryBudget - this.getCategoryActvitiy('Total').categoryActivity);
    var myChart = new Chart("categoryOverviewChart", {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              label: 'Activity Per Category',
              data: data,
              backgroundColor: [ ],
              borderColor: [ ],
              borderWidth: 1
          }]
      }
  });
  }
}
