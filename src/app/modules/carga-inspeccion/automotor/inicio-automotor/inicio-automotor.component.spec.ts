import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAutomotorComponent } from './inicio-automotor.component';

describe('InicioAutomotorComponent', () => {
  let component: InicioAutomotorComponent;
  let fixture: ComponentFixture<InicioAutomotorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioAutomotorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAutomotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
