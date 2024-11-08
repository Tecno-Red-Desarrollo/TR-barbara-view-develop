import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePeritacionFotosComponent } from './informe-peritacion-fotos.component';

describe('InformePeritacionFotosComponent', () => {
  let component: InformePeritacionFotosComponent;
  let fixture: ComponentFixture<InformePeritacionFotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformePeritacionFotosComponent]
    });
    fixture = TestBed.createComponent(InformePeritacionFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
