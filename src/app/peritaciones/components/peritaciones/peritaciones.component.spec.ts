import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeritacionesComponent } from './peritaciones.component';

describe('PeritacionesComponent', () => {
  let component: PeritacionesComponent;
  let fixture: ComponentFixture<PeritacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeritacionesComponent]
    });
    fixture = TestBed.createComponent(PeritacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
