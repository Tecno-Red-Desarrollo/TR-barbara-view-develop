import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProductorZurichComponent } from './inicio-productor-zurich.component';

describe('InicioProductorZurichComponent', () => {
  let component: InicioProductorZurichComponent;
  let fixture: ComponentFixture<InicioProductorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioProductorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioProductorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
