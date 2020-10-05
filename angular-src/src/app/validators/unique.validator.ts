import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { BudgetService } from '../services/budget.service';

@Injectable({ providedIn: 'root' })
export class UniqueNameValidator implements AsyncValidator{
    constructor(private budgetService: BudgetService) { }

    validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.budgetService.getBudgetByName(c.value).pipe(map(budget => (budget ? { UniqueNameValidator: true } : null)),
        catchError(() => of(null))
        );
    }
}