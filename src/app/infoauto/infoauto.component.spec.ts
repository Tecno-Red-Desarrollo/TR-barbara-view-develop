import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoautoComponent } from './infoauto.component';

describe('InfoautoComponent', () => {
  let component: InfoautoComponent;
  let fixture: ComponentFixture<InfoautoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoautoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoautoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
