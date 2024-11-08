import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirLugarComponent } from './elegir-lugar.component';

describe('ElegirLugarComponent', () => {
  let component: ElegirLugarComponent;
  let fixture: ComponentFixture<ElegirLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElegirLugarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
