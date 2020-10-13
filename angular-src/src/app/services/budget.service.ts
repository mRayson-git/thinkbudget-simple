import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budgetUrl = '/api/budgets/';
  constructor(private http: HttpClient) { }

  

  //GET
  getBudgetByName(userEmail: string): Observable<Budget> {
    return this.http.get<Budget>(this.budgetUrl + userEmail);
  }
  
  //POST
  saveBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.budgetUrl, budget);
  }

  //PUT
  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(this.budgetUrl, budget);
  }
}
