import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionCombinadoFamiliarComponent } from './verificacion-combinado-familiar.component';

describe('VerificacionCombinadoFamiliarComponent', () => {
  let component: VerificacionCombinadoFamiliarComponent;
  let fixture: ComponentFixture<VerificacionCombinadoFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificacionCombinadoFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionCombinadoFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
