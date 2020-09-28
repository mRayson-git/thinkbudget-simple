import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserProfileComponent } from './parser-profile.component';

describe('ParserProfileComponent', () => {
  let component: ParserProfileComponent;
  let fixture: ComponentFixture<ParserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
