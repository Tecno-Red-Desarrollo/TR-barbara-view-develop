import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCargaInspeccionComponent } from './layout-carga-inspeccion.component';

describe('LayoutCargaInspeccionComponent', () => {
  let component: LayoutCargaInspeccionComponent;
  let fixture: ComponentFixture<LayoutCargaInspeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutCargaInspeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCargaInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
