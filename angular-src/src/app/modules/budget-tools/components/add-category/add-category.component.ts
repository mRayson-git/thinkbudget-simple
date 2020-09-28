import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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

  categoryForm: FormGroup;

  constructor(private budgetService: BudgetService, private fb: FormBuilder) { 
    this.types = [
      'Choose a Type',
      'Daily',
      'Weekly',
      'Monthly'
    ]
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      //In the form builder the first element is the default value, the second is for validators
      catType: ['',Validators.required],
      catName: ['']
    });
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
