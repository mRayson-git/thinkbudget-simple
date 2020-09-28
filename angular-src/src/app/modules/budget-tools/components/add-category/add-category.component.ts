import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetService } from 'src/app/modules/shared/services/budget.service';
import { Category } from 'src/app/modules/shared/models/category';
import { IMessage } from 'src/app/modules/shared/models/imessage';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  types: string[];

  category: Category;
  message: IMessage;

  categoryForm = new FormGroup({
    catType: new FormControl(''),
    catName: new FormControl('')
  });

  constructor(private budgetService: BudgetService) { 
    this.types = [
      'Choose a Type',
      'Daily',
      'Weekly',
      'Monthly'
    ]
  }

  ngOnInit(): void {
  }

  getFormValue(value: string) {
    return this.categoryForm.controls[value].value;
  }

  onSubmit(){
    this.category = {
      catName: this.getFormValue('catType') + "_" + this.getFormValue('catName')
    }
    console.log(this.category);
    this.budgetService.saveCategory(this.category).subscribe(message => {
      this.message = message;
    });
    this.categoryForm.controls['catName'].reset();
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  checkCatName(){
    this.budgetService.getCategoryByName(this.getFormValue('catName')).subscribe(msg => {
      if(msg.success || this.getFormValue('catName') === ''){
        console.log('Invalid');
      } else {
        console.log('Valid');
      }
    });
  }
}
