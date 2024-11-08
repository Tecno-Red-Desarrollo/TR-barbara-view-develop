import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionAutomotorZurichComponent } from './verificacion-automotor-zurich.component';

describe('VerificacionAutomotorZurichComponent', () => {
  let component: VerificacionAutomotorZurichComponent;
  let fixture: ComponentFixture<VerificacionAutomotorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificacionAutomotorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionAutomotorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
