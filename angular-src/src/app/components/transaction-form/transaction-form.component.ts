import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Transaction } from 'src/app/models/transaction';
import { Budget } from 'src/app/models/budget';
import { BudgetService } from 'src/app/services/budget.service';
import { TransactionService } from 'src/app/services/transaction.service';

// TODO: Add sorting for table and options

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  knownCategories: Category[];
  pastTransactions: Transaction[];

  userEmail: string;
  constructor(
    private formBuilder: FormBuilder, 
    private transactionService: TransactionService,
    private budgetService: BudgetService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      transactionDate: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      transactionCategory: ['', Validators.required]
    });
    this.auth.user$.subscribe(user => {
      this.userEmail = user.email;
      this.getCategories(user.email).subscribe(budget => {
        this.knownCategories = budget.budgetCategories;
      });
      this.getTransactions(user.email);
    });
  
  }

  transactionSubmit(){
    let transaction: Transaction = {
      userEmail: this.userEmail,
      transactionDate: this.transactionForm.get('transactionDate').value,
      transactionAmount: this.transactionForm.get('transactionAmount').value,
      transactionCategory: this.transactionForm.get('transactionCategory').value
    }
    this.transactionService.saveTransaction(transaction).subscribe(transaction => {
      if (transaction) {
        console.log(transaction);
        this.getTransactions(this.userEmail);
      } else {
        console.error('failure');
      }
    });
    this.transactionForm.reset();
  }

  // Pulls the current budget information (containing the categories)
  getCategories(userEmail: string): Observable<Budget> {
    return this.budgetService.getBudgetByName(userEmail);
  }

  getTransactions(userEmail: string) {
    this.transactionService.getTransactions(userEmail).subscribe(data => {
      this.pastTransactions = data;
    });
  }

}
