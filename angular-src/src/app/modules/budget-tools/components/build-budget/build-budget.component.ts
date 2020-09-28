import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/modules/shared/services/budget.service';
import { Category } from 'src/app/modules/shared/models/category';
import { FormGroup, FormControl } from '@angular/forms';
import { Budget } from 'src/app/modules/shared/models/budget';
import { IMessage } from 'src/app/modules/shared/models/imessage';


@Component({
  selector: 'app-build-budget',
  templateUrl: './build-budget.component.html',
  styleUrls: ['./build-budget.component.css']
})
export class BuildBudgetComponent implements OnInit {
  categories: Category[];
  budgets: Budget[];
  months: string[];
  
  noCategories: boolean;
  noBudgets: boolean;
  alertMessage: boolean;
  message: IMessage;

  budgetForm = new FormGroup({
    month: new FormControl(''),
    year: new FormControl(''),
    catName: new FormControl(''),
    amount: new FormControl('')
  });

  constructor(private budgetService: BudgetService) { 
    this.months = [
      'Choose a month',
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
  }

  ngOnInit(): void {
    this.getCategories();
  }
  get monthValue(): string {
    //return the month number instead
    return this.monthNameToNumber(this.budgetForm.controls['month'].value);
  }

  get monthValueNotFormatted() {
    return this.monthNameToNumberNotFormatted(this.budgetForm.controls['month'].value);
  }

  get yearValue(): string {
    return this.budgetForm.controls['year'].value;
  }

  get catName(): string {
    return this.budgetForm.controls['catName'].value;
  }

  get amount(): number {
    return this.budgetForm.controls['amount'].value;
  }

  monthNameToNumber(monthName: string): string {
    let monthNum = this.months.indexOf(monthName);
    // console.log("Index of: " + monthName + " is: " + monthNum);
    if (monthNum < 10){
      return '0' + monthNum.toString();
    }
    return monthNum.toString();
  }

  monthNameToNumberNotFormatted(monthName: string): number {
    return this.months.indexOf(monthName);
  }

  getCategories(): void {
    this.budgetService.getCategories().subscribe(data => {
      this.categories = data;
      if(this.categories.length === 0) {
        this.noCategories = true;
      } else {
        this.noCategories = false;
      }
    });
  }

  getBudgetsForSelectedTime(): void {
    this.budgetService.getBudgetsByTimeFrame(this.yearValue, this.monthValue).subscribe(budgets => {
      this.budgets = budgets;
      if(this.budgets.length === 0) {
        this.noBudgets = true;
      } else {
        this.noBudgets = false;
      }
    });
  }

  onSubmit(){
    let budget: Budget = {
      date: new Date(parseInt(this.yearValue), parseInt(this.monthValue) - 1, 1),
      categoryName: this.catName,
      amount: this.amount
    }
    this.budgetService.saveBudget(budget).subscribe(message => {
      this.message = message;
    });
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  refresh(){
    this.getCategories();
  }

  refreshBudgetDisplay(){
    this.getBudgetsForSelectedTime();
  }

  displayHelp(){
    this.alertMessage = true;
    console.log('Help clicked');
    setTimeout(() => {
      this.alertMessage = false;
      console.log('Help hidden');
    }, 6000);
  }
}
