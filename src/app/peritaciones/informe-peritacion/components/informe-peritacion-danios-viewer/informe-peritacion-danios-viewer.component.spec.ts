import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformePeritacionDaniosViewerComponent } from './informe-peritacion-danios-viewer.component';

describe('InformePeritacionDaniosViewerComponent', () => {
  let component: InformePeritacionDaniosViewerComponent;
  let fixture: ComponentFixture<InformePeritacionDaniosViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformePeritacionDaniosViewerComponent]
    });
    fixture = TestBed.createComponent(InformePeritacionDaniosViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
