import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsideracionesAutomotorComponent } from './consideraciones-automotor.component';

describe('ConsideracionesAutomotorComponent', () => {
  let component: ConsideracionesAutomotorComponent;
  let fixture: ComponentFixture<ConsideracionesAutomotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsideracionesAutomotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsideracionesAutomotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
