import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrbPTagComponent } from './brb-p-tag.component';

describe('BrbPTagComponent', () => {
  let component: BrbPTagComponent;
  let fixture: ComponentFixture<BrbPTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrbPTagComponent]
    });
    fixture = TestBed.createComponent(BrbPTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
