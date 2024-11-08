import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarUbicacionComponent } from './confirmar-ubicacion.component';

describe('ConfirmarUbicacionComponent', () => {
  let component: ConfirmarUbicacionComponent;
  let fixture: ComponentFixture<ConfirmarUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarUbicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
