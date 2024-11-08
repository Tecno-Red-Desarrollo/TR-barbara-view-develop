import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicInformeInspeccionComponent } from './public-informe-inspeccion.component';

describe('PublicInformeInspeccionComponent', () => {
  let component: PublicInformeInspeccionComponent;
  let fixture: ComponentFixture<PublicInformeInspeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicInformeInspeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicInformeInspeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
