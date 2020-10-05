import { Category } from './category';

export interface Budget {
    userEmail: string,
    budgetCategories: Category[]
}