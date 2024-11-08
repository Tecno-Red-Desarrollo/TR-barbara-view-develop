import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCentroComponent } from './agendar-centro.component';

describe('AgendarCentroComponent', () => {
  let component: AgendarCentroComponent;
  let fixture: ComponentFixture<AgendarCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarCentroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
