import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDaniosDetalleVerifeyeComponent } from './informe-danios-detalle-verifeye.component';

describe('InformeDaniosDetalleVerifeyeComponent', () => {
  let component: InformeDaniosDetalleVerifeyeComponent;
  let fixture: ComponentFixture<InformeDaniosDetalleVerifeyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeDaniosDetalleVerifeyeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeDaniosDetalleVerifeyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
