import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildBudgetComponent } from './build-budget.component';

describe('BuildBudgetComponent', () => {
  let component: BuildBudgetComponent;
  let fixture: ComponentFixture<BuildBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
