import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarDomicilioComponent } from './agendar-domicilio.component';

describe('AgendarDomicilioComponent', () => {
  let component: AgendarDomicilioComponent;
  let fixture: ComponentFixture<AgendarDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendarDomicilioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
