import { Category } from './category';

export interface Budget {
    userEmail: string,
    budgetTotal: number,
    budgetCategories: Category[]
}