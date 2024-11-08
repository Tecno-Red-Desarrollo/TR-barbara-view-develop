import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeInspeccionComponent } from './informe-inspeccion.component';

describe('InformeInspeccionComponent', () => {
  let component: InformeInspeccionComponent;
  let fixture: ComponentFixture<InformeInspeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeInspeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
