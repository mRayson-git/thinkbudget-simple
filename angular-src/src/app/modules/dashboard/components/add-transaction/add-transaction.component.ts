import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Budget } from 'src/app/modules/shared/models/budget';
import { Category } from 'src/app/modules/shared/models/category';
import { IMessage } from 'src/app/modules/shared/models/imessage';
import { ITransaction } from 'src/app/modules/shared/models/itransaction';
import { BudgetService } from 'src/app/modules/shared/services/budget.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  categories: Category[];
  message: IMessage;
  today = new Date();

  noCategories: boolean;

  transactionForm = new FormGroup({
    date: new FormControl(''),
    amount: new FormControl(''),
    category: new FormControl('')
  });


  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgetService.getCategories().subscribe(categories => {
      this.categories = categories;
      if(this.categories.length === 0) {
        this.noCategories = true;
      } else {
        this.noCategories = false;
      }
    });
  }

  get dateValue() {
    return this.transactionForm.controls['date'].value.split("/");
  }
  get amountValue() {
    return this.transactionForm.controls['amount'].value;
  }
  get categoryValue() {
    return this.transactionForm.controls['category'].value;
  }

  displayHelp(){

  }

  onSubmit() {
    let transDate = this.dateValue;
    let transaction: ITransaction = {
      date: new Date(transDate[2], transDate[1] - 1, transDate[0]),
      amount: this.amountValue,
      category: this.categoryValue
    }
    //console.log(transaction);
    this.budgetService.saveTransaction(transaction).subscribe(message => {
      this.message = message;
    });
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

}
