import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetToolsComponent } from './budget-tools.component';

describe('BudgetToolsComponent', () => {
  let component: BudgetToolsComponent;
  let fixture: ComponentFixture<BudgetToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
