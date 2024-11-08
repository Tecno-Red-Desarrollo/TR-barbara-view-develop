import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePeritacionGeoComponent } from './informe-peritacion-geo.component';

describe('InformePeritacionGeoComponent', () => {
  let component: InformePeritacionGeoComponent;
  let fixture: ComponentFixture<InformePeritacionGeoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformePeritacionGeoComponent]
    });
    fixture = TestBed.createComponent(InformePeritacionGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
