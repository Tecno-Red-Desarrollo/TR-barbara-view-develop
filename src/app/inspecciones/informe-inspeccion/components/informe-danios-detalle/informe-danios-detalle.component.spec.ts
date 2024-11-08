import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDaniosDetalleComponent } from './informe-danios-detalle.component';

describe('InformeDaniosDetalleComponent', () => {
  let component: InformeDaniosDetalleComponent;
  let fixture: ComponentFixture<InformeDaniosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeDaniosDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeDaniosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
