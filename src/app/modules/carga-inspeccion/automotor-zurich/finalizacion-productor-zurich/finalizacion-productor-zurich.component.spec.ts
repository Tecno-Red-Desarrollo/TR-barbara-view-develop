import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizacionProductorZurichComponent } from './finalizacion-productor-zurich.component';

describe('FinalizacionProductorZurichComponent', () => {
  let component: FinalizacionProductorZurichComponent;
  let fixture: ComponentFixture<FinalizacionProductorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizacionProductorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizacionProductorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
