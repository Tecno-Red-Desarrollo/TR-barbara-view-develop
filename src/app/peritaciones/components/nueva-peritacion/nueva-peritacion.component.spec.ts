import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPeritacionComponent } from './nueva-peritacion.component';

describe('NuevaPeritacionComponent', () => {
  let component: NuevaPeritacionComponent;
  let fixture: ComponentFixture<NuevaPeritacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaPeritacionComponent]
    });
    fixture = TestBed.createComponent(NuevaPeritacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
