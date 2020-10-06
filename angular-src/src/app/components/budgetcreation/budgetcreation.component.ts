import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'; 
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
  budget: Budget;
  categories: Category[];
  knownCategories: string[];
  message: Message;

  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.categories = [];
    this.knownCategories = [
      "Rent",
      "Groceries",
      "Entertainment",
      "Outings",
      "Education"
    ]
    this.knownCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryAmount: ['', Validators.required]
    });
    this.customCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, uniqueCategory(this.knownCategories)]],
      categoryAmount: ['', Validators.required]
    });

    this.getBudget();
    this.knownCategories.sort();
    this.sortCategories(this.categories);
  }

  // Submit Functions
  addKnownCategory() {
    let category: Category = {
      categoryName: this.knownCategoryForm.get('categoryName').value,
      categoryAmount: this.knownCategoryForm.get('categoryAmount').value
    }
    //check to see if it has already been added
    this.removeCategory(category.categoryName);
    this.categories.push(category);
    this.sortCategories(this.categories);
    this.knownCategoryForm.reset({
      categoryName: '',
      categoryAmount: null
    });
  }
  addCustomCategory(){
    let category: Category = {
      categoryName: this.customCategoryForm.get('categoryName').value,
      categoryAmount: this.customCategoryForm.get('categoryAmount').value
    }
    this.knownCategories.push(category.categoryName);
    this.categories.push(category);
    //console.log(this.categories);
    this.customCategoryForm.reset();
  }

  getBudget() {
    this.budgetService.getBudgetByName("mrayson5129@gmail.com").subscribe(
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
    let budget: Budget = {
      userEmail: "mrayson5129@gmail.com",
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

  isInvalidKnownCategory(field: string): boolean {
    return (this.knownCategoryForm.get(field).touched || this.knownCategoryForm.get(field).dirty) && !this.knownCategoryForm.get(field).valid? true : false;
  }
  isValidKnownCategory(field: string): boolean {
    return (this.knownCategoryForm.get(field).touched || this.knownCategoryForm.get(field).dirty) && this.knownCategoryForm.get(field).valid? true : false;
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
    this.knownCategories.sort();
    this.sortCategories(this.categories);
  }

  removeCategory(categoryName: string) {
    this.categories = this.categories.filter((category) => {return category.categoryName !== categoryName});
  }

  sortCategories(categories: Category[]){
    categories.sort((first, second) => {
      return first.categoryName > second.categoryName? 1 : -1;
    });
  }

}
