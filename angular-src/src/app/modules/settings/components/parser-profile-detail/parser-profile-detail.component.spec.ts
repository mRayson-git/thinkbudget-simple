import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserProfileDetailComponent } from './parser-profile-detail.component';

describe('ParserProfileDetailComponent', () => {
  let component: ParserProfileDetailComponent;
  let fixture: ComponentFixture<ParserProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParserProfileDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
