import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBarbaraComponent } from './layout-barbara.component';

describe('LayoutBarbaraComponent', () => {
  let component: LayoutBarbaraComponent;
  let fixture: ComponentFixture<LayoutBarbaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutBarbaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBarbaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
