import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Budget } from 'src/app/models/budget';
import { Transaction } from 'src/app/models/transaction';
import { BudgetService } from 'src/app/services/budget.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  budget: Budget;
  transactions: Transaction[];
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
    console.log(timeframe);
    this.auth.user$.subscribe(user => {
      this.userEmail = user.email;
      this.budgetService.getBudgetByName(user.email).subscribe(budget => {
        this.budget = budget;
      });
      this.transactionService.getTransactionsInTimeframe(this.userEmail, timeframe).subscribe(transactions => {
        this.transactions = transactions;
        console.log(this.transactions);
      });
    });
  }

}
