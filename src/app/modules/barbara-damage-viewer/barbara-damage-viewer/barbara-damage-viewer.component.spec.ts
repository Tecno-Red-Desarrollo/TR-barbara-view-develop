import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbaraDamageViewerComponent } from './barbara-damage-viewer.component';

describe('BarbaraDamageViewerComponent', () => {
  let component: BarbaraDamageViewerComponent;
  let fixture: ComponentFixture<BarbaraDamageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarbaraDamageViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarbaraDamageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
