import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizacionAutomotorComponent } from './finalizacion-automotor.component';

describe('FinalizacionAutomotorComponent', () => {
  let component: FinalizacionAutomotorComponent;
  let fixture: ComponentFixture<FinalizacionAutomotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizacionAutomotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizacionAutomotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
