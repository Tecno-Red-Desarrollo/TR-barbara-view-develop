import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsZurichComponent } from './steps-zurich.component';

describe('StepsZurichComponent', () => {
  let component: StepsZurichComponent;
  let fixture: ComponentFixture<StepsZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
