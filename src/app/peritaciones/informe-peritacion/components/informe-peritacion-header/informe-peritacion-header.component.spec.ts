import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePeritacionHeaderComponent } from './informe-peritacion-header.component';

describe('InformePeritacionHeaderComponent', () => {
  let component: InformePeritacionHeaderComponent;
  let fixture: ComponentFixture<InformePeritacionHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformePeritacionHeaderComponent]
    });
    fixture = TestBed.createComponent(InformePeritacionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
