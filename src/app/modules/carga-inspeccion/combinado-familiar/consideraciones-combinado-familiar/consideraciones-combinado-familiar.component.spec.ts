import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsideracionesCombinadoFamiliarComponent } from './consideraciones-combinado-familiar.component';

describe('ConsideracionesCombinadoFamiliarComponent', () => {
  let component: ConsideracionesCombinadoFamiliarComponent;
  let fixture: ComponentFixture<ConsideracionesCombinadoFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsideracionesCombinadoFamiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsideracionesCombinadoFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
