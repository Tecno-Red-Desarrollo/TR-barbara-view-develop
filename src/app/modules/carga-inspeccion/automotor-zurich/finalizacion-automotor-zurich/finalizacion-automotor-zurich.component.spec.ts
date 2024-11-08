import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizacionAutomotorZurichComponent } from './finalizacion-automotor-zurich.component';

describe('FinalizacionAutomotorZurichComponent', () => {
  let component: FinalizacionAutomotorZurichComponent;
  let fixture: ComponentFixture<FinalizacionAutomotorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizacionAutomotorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizacionAutomotorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
