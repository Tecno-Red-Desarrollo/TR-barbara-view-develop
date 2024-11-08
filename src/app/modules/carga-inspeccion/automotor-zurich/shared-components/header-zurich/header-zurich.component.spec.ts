import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderZurichComponent } from './header-zurich.component';

describe('HeaderZurichComponent', () => {
  let component: HeaderZurichComponent;
  let fixture: ComponentFixture<HeaderZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
