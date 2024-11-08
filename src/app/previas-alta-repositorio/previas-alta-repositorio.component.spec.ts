import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviasAltaRepositorioComponent } from './previas-alta-repositorio.component';

describe('PreviasAltaRepositorioComponent', () => {
  let component: PreviasAltaRepositorioComponent;
  let fixture: ComponentFixture<PreviasAltaRepositorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviasAltaRepositorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviasAltaRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
