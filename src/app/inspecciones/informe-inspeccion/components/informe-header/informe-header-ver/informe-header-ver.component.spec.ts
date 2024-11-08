import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeHeaderVERComponent } from './informe-header-ver.component';

describe('InformeHeaderVERComponent', () => {
  let component: InformeHeaderVERComponent;
  let fixture: ComponentFixture<InformeHeaderVERComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformeHeaderVERComponent]
    });
    fixture = TestBed.createComponent(InformeHeaderVERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
