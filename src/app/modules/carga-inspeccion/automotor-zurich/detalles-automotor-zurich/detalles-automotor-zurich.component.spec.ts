import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAutomotorZurichComponent } from './detalles-automotor-zurich.component';

describe('DetallesAutomotorZurichComponent', () => {
  let component: DetallesAutomotorZurichComponent;
  let fixture: ComponentFixture<DetallesAutomotorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesAutomotorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAutomotorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
