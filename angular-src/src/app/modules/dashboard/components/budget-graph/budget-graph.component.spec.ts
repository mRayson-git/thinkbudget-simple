import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGraphComponent } from './budget-graph.component';

describe('BudgetGraphComponent', () => {
  let component: BudgetGraphComponent;
  let fixture: ComponentFixture<BudgetGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
