import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePeritacionDaniosDetalleVerifeyeComponent } from './informe-peritacion-danios-detalle-verifeye.component';

describe('InformePeritacionDaniosDetalleVerifeyeComponent', () => {
  let component: InformePeritacionDaniosDetalleVerifeyeComponent;
  let fixture: ComponentFixture<InformePeritacionDaniosDetalleVerifeyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformePeritacionDaniosDetalleVerifeyeComponent]
    });
    fixture = TestBed.createComponent(InformePeritacionDaniosDetalleVerifeyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
