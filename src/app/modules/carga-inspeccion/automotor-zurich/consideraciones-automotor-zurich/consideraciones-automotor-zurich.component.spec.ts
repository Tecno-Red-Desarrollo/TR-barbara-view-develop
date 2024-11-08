import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsideracionesAutomotorZurichComponent } from './consideraciones-automotor-zurich.component';

describe('ConsideracionesAutomotorZurichComponent', () => {
  let component: ConsideracionesAutomotorZurichComponent;
  let fixture: ComponentFixture<ConsideracionesAutomotorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsideracionesAutomotorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsideracionesAutomotorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
