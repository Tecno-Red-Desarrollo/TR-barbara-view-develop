import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosZurichComponent } from './fotos-zurich.component';

describe('FotosZurichComponent', () => {
  let component: FotosZurichComponent;
  let fixture: ComponentFixture<FotosZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
