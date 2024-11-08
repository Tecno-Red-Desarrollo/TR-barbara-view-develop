import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrbVisionComponent } from './brb-vision.component';

describe('BrbVisionComponent', () => {
  let component: BrbVisionComponent;
  let fixture: ComponentFixture<BrbVisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrbVisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrbVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
