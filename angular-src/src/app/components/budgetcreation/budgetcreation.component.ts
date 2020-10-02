import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { getMaxListeners } from 'process';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-budgetcreation',
  templateUrl: './budgetcreation.component.html',
  styleUrls: ['./budgetcreation.component.scss']
})
export class BudgetcreationComponent implements OnInit {
  categoryForm: FormGroup;
  budgetForm: FormGroup;

  categories: Category[];

  constructor(private formBuilder: FormBuilder, public auth: AuthService) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    });
    this.budgetForm = this.formBuilder.group({
      budgetDate: ['',Validators.required],
      budgetAmount: ['', Validators.required],
      budgetCategory: ['',Validators.required]
    });
    this.categories = [{
      userEmail: "mrayson5129@gmail.com",
      categoryName: "Groceries"
    }]
  }

  categorySubmit(){
    console.log(this.categoryForm.get('categoryName').errors);
    console.log(this.categoryForm.valid);
    console.log({ userEmail: this.auth.user.email, categoryName: this.categoryForm.get('categoryName').value });
    this.categoryForm.reset();
  }

  budgetSubmit() {
    console.log({ userEmail: this.auth.user.email, budgetForm: this.budgetForm.value });
    this.budgetForm.reset();
  }

}
