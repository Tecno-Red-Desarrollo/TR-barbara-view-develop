import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgVehicleComponent } from './svg-vehicle.component';

describe('SvgVehicleComponent', () => {
  let component: SvgVehicleComponent;
  let fixture: ComponentFixture<SvgVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
