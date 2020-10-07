import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'; 
import { AuthService } from '@auth0/auth0-angular';
import { Budget } from 'src/app/models/budget';
import { Category } from 'src/app/models/category';
import { Message } from 'src/app/models/message';
import { BudgetService } from 'src/app/services/budget.service';

function uniqueCategory(list: string[]): ValidatorFn {
  return (c: AbstractControl): { [key: string]: any } | null => {
    let notUnique = false;
    list.forEach(category => {
      if (c.value === category){
        notUnique = true;
      }
    });
    return notUnique ? {notUnique: {value: c.value}} : null;
  }
}

@Component({
  selector: 'app-budgetcreation',
  templateUrl: './budgetcreation.component.html',
  styleUrls: ['./budgetcreation.component.scss']
})
export class BudgetcreationComponent implements OnInit {
  knownCategoryForm: FormGroup;
  customCategoryForm: FormGroup;
  budgetTotalForm: FormGroup;
  budget: Budget;
  categories: Category[];
  budgetTotal: number;
  remainingBudget: number;
  knownCategories: string[];
  message: Message;
  userEmail: string;

  constructor(
    private formBuilder: FormBuilder, 
    private budgetService: BudgetService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.categories = [];
    this.auth.user$.subscribe(user => {
      this.userEmail = user.email;
      this.getBudget();
      this.knownCategories.sort();
      this.sortCategories(this.categories);
      this.calculateRemainingBudget();
    });
    this.knownCategories = [
      "Rent",
      "Groceries",
      "Entertainment",
      "Outings",
      "Education"
    ]
    this.knownCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryAmount: ['', Validators.required],
      categoryColour: ['#5cb85c', Validators.required]
    });
    this.customCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, uniqueCategory(this.knownCategories)]],
    });
    this.budgetTotalForm = this.formBuilder.group({
      budgetTotal: ['', Validators.required]
    });
    
  }

  // Submit Functions
  addBudgetTotal() {
    this.budgetTotal = this.budgetTotalForm.get('budgetTotal').value;
    this.budgetTotalForm.reset();
  }
  addKnownCategory() {
    let category: Category = {
      categoryName: this.knownCategoryForm.get('categoryName').value,
      categoryAmount: this.knownCategoryForm.get('categoryAmount').value,
      categoryColour: this.knownCategoryForm.get('categoryColour').value
    }
    //check to see if it has already been added
    this.removeCategory(category.categoryName);
    this.categories.push(category);
    this.sortCategories(this.categories);
    this.calculateRemainingBudget();
    console.log(this.knownCategoryForm.value);
    this.knownCategoryForm.reset({
      categoryName: '',
      categoryAmount: null,
      categoryColour: '#5cb85c'
    });
    
  }
  addCustomCategory(){
    let categoryName = this.customCategoryForm.get('categoryName').value;
    this.knownCategories.push(categoryName);
    this.knownCategories.sort();
    this.customCategoryForm.reset();
  }
  getBudget() {
    this.budgetService.getBudgetByName(this.userEmail).subscribe(
      budget => {
        if (budget !== null){
          this.budget = budget;
          this.updateInformation(this.budget);
        }
      },
      err => console.log(err),
      () => console.log('Budget has been retrieved')
    );
  }

  // Adding budget to database
  updateBudget() {
    //sort the categories before inserting into the database
    this.sortCategories(this.categories);
    let budget: Budget = {
      userEmail: this.userEmail,
      budgetTotal: this.budgetTotal,
      budgetCategories: this.categories
    }
    this.budgetService.getBudgetByName(budget.userEmail).subscribe(response => {
      if(response === null) {
        this.budgetService.saveBudget(budget).subscribe(data => {
          if (data !== null) {
            this.updateInformation(budget);
          }
        });
      } else {
        this.budgetService.updateBudget(budget).subscribe(data => {
          if (data) {
            this.updateInformation(budget);
            this.message = {
              success: true,
              msg: "Budget has been saved"
            }
            setTimeout(() => this.message = undefined, 3000);
          } else {
            this.message = {
              success: false,
              msg: "Budget has not been saved"
            }
            setTimeout(() => this.message = undefined, 3000);
          }
        });
      }
    });
  }
  isInvalidBudgetTotal(field: string): boolean {
    return (this.budgetTotalForm.get(field).touched || this.budgetTotalForm.get(field).dirty) && !this.budgetTotalForm.get(field).valid;
  }
  isValidBudgetTotal(field: string): boolean {
    return (this.budgetTotalForm.get(field).touched || this.budgetTotalForm.get(field).dirty) && this.budgetTotalForm.get(field).valid;
  }
  isInvalidKnownCategory(field: string): boolean {
    return (this.knownCategoryForm.get(field).touched || this.knownCategoryForm.get(field).dirty) && !this.knownCategoryForm.get(field).valid;
  }
  isValidKnownCategory(field: string): boolean {
    return (this.knownCategoryForm.get(field).touched || this.knownCategoryForm.get(field).dirty) && this.knownCategoryForm.get(field).valid;
  }
  isInvalidCategory(field: string): boolean {
    return (this.customCategoryForm.get(field).touched || this.customCategoryForm.get(field).dirty) && !this.customCategoryForm.get(field).valid;
  }
  isValidCategory(field: string): boolean {
    return (this.customCategoryForm.get(field).touched || this.customCategoryForm.get(field).dirty) && this.customCategoryForm.get(field).valid;
  }

  //Helper function
  updateInformation(budget: Budget) {
    this.categories = [];
    budget.budgetCategories.forEach((category) => {
      if (this.knownCategories.indexOf(category.categoryName) === -1) {
        this.knownCategories.push(category.categoryName);
      }
      this.categories.push(category);
    });
    this.budgetTotal = budget.budgetTotal;
    this.knownCategories.sort();
    this.sortCategories(this.categories);
    this.calculateRemainingBudget();
  }

  removeCategory(categoryName: string) {
    this.categories = this.categories.filter((category) => {return category.categoryName !== categoryName});
  }

  sortCategories(categories: Category[]): void {
    categories.sort((first, second) => {
      return first.categoryName > second.categoryName? 1 : -1;
    });
  }

  calculateRemainingBudget() {
    let sum = 0;
    this.categories.forEach((category) => {
      sum += category.categoryAmount;
    });
    this.remainingBudget = this.budgetTotal - sum;
  }
}
