import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrbPeritacionTagComponent } from './brb-peritacion-tag.component';

describe('BrbPeritacionTagComponent', () => {
  let component: BrbPeritacionTagComponent;
  let fixture: ComponentFixture<BrbPeritacionTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrbPeritacionTagComponent]
    });
    fixture = TestBed.createComponent(BrbPeritacionTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
