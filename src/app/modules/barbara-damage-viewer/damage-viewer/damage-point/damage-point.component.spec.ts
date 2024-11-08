import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagePointComponent } from './damage-point.component';

describe('DamagePointComponent', () => {
  let component: DamagePointComponent;
  let fixture: ComponentFixture<DamagePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamagePointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
