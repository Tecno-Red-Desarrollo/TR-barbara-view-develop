import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAutomotorComponent } from './detalles-automotor.component';

describe('DetallesAutomotorComponent', () => {
  let component: DetallesAutomotorComponent;
  let fixture: ComponentFixture<DetallesAutomotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesAutomotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAutomotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
