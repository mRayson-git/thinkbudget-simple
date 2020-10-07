import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionUrl="http://localhost:3000/api/transactions/";
  constructor(private http: HttpClient) { }

  saveTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(this.transactionUrl, transaction);
  }

  getTransactions(userEmail: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl + userEmail);
  }

  getTransactionsInTimeframe(userEmail: string, timeframe: string): Observable<Transaction[]> {
    console.log(this.transactionUrl + userEmail + '?timeframe=' + timeframe);
    return this.http.get<Transaction[]>(this.transactionUrl + userEmail + '?timeframe=' + timeframe);
  }
}
