import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsPresencialComponent } from './steps-presencial.component';

describe('StepsPresencialComponent', () => {
  let component: StepsPresencialComponent;
  let fixture: ComponentFixture<StepsPresencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsPresencialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsPresencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
