import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioCombinadoFamiliarComponent } from './inicio-combinado-familiar.component';

describe('InicioCombinadoFamiliarComponent', () => {
  let component: InicioCombinadoFamiliarComponent;
  let fixture: ComponentFixture<InicioCombinadoFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioCombinadoFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioCombinadoFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
