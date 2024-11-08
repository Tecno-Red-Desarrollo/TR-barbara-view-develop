import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePeritacionDaniosDetalleComponent } from './informe-peritacion-danios-detalle.component';

describe('InformePeritacionDaniosDetalleComponent', () => {
  let component: InformePeritacionDaniosDetalleComponent;
  let fixture: ComponentFixture<InformePeritacionDaniosDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformePeritacionDaniosDetalleComponent]
    });
    fixture = TestBed.createComponent(InformePeritacionDaniosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
