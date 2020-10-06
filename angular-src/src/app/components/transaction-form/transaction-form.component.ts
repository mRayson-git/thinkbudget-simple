import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      transactionDate: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      transactionCategory: ['', Validators.required]
    });
  }

  transactionSubmit(){
    let transaction: Transaction = {
      transactionDate: this.transactionForm.get('transactionDate').value,
      transactionAmount: this.transactionForm.get('transactionAmount').value,
      transactionCategory: this.transactionForm.get('transactionCategory').value
    }
    console.log(this.transactionForm.value);
    this.transactionForm.reset();
  }

}
