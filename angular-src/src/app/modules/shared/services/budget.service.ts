import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget';
import { Category } from '../models/category';
import { IMessage } from '../models/imessage';
import { ITransaction } from '../models/itransaction';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  categoryUrl = 'http://localhost:3000/api/categories/';
  budgetUrl = 'http://localhost:3000/api/categoryBudgets/';
  transUrl = 'http://localhost:3000/api/transactions/';
  
  constructor(private http: HttpClient) { }

  //category related methods
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getCategoryByName(catName: string): Observable<IMessage> {
    return this.http.get<IMessage>(this.categoryUrl + catName)
  }

  saveCategory(category: Category): Observable<IMessage> {
    return this.http.post<IMessage>(this.categoryUrl, category);
  }

  getCategoryActivity(categoryName: string, year: string, month: string): Observable<ITransaction[]> {
    console.log(`${this.transUrl}${categoryName}?year=${year}&month=${month}`);
    return this.http.get<ITransaction[]>(`${this.transUrl}${categoryName}?year=${year}&month=${month}`);
  }

  //budget related methods
  getBudgetsByTimeFrame(year: string, month: string): Observable<Budget[]> {
    console.log(this.budgetUrl + year + "?month=" + month);
    return this.http.get<Budget[]>(this.budgetUrl + year + "?month=" + month);
  }

  saveBudget(budget: Budget): Observable<IMessage> {
    return this.http.post<IMessage>(this.budgetUrl, budget);
  }

  //transaction related methods
  getTransactionsByTimeFrame(year: string, month: string ): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.budgetUrl + year + "?month=" + month);
  }

  saveTransaction(transaction: ITransaction): Observable<IMessage> {
    console.log(transaction);
    return this.http.post<IMessage>(this.transUrl, transaction);
  }
}
