import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetcreationComponent } from './budgetcreation.component';

describe('BudgetcreationComponent', () => {
  let component: BudgetcreationComponent;
  let fixture: ComponentFixture<BudgetcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetcreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
