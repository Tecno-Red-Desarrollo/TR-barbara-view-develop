import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReenvioAseguradoProductorZurichComponent } from './reenvio-asegurado-productor-zurich.component';

describe('ReenvioAseguradoProductorZurichComponent', () => {
  let component: ReenvioAseguradoProductorZurichComponent;
  let fixture: ComponentFixture<ReenvioAseguradoProductorZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReenvioAseguradoProductorZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReenvioAseguradoProductorZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
