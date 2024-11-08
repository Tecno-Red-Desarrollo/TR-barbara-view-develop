import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePeritacionComponent } from './informe-peritacion.component';

describe('InformePeritacionComponent', () => {
  let component: InformePeritacionComponent;
  let fixture: ComponentFixture<InformePeritacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformePeritacionComponent]
    });
    fixture = TestBed.createComponent(InformePeritacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
