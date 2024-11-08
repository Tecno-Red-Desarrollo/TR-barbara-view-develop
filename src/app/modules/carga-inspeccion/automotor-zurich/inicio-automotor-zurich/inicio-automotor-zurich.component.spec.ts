import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAutomotorZurichComponent } from './inicio-automotor-zurich.component';

describe('InicioAutomotorZurichComponent', () => {
  let component: InicioAutomotorZurichComponent;
  let fixture: ComponentFixture<InicioAutomotorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioAutomotorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAutomotorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
