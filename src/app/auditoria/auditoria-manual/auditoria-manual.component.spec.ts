import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaManualComponent } from './auditoria-manual.component';

describe('AuditoriaManualComponent', () => {
  let component: AuditoriaManualComponent;
  let fixture: ComponentFixture<AuditoriaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditoriaManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditoriaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
