import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeGeoComponent } from './informe-geo.component';

describe('InformeGeoComponent', () => {
  let component: InformeGeoComponent;
  let fixture: ComponentFixture<InformeGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeGeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
