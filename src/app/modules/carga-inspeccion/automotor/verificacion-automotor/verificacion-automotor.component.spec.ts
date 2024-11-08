import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionAutomotorComponent } from './verificacion-automotor.component';

describe('VerificacionAutomotorComponent', () => {
  let component: VerificacionAutomotorComponent;
  let fixture: ComponentFixture<VerificacionAutomotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificacionAutomotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionAutomotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
