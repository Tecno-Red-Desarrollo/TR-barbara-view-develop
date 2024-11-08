import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosZurichComponent } from './documentos-zurich.component';

describe('DocumentosZurichComponent', () => {
  let component: DocumentosZurichComponent;
  let fixture: ComponentFixture<DocumentosZurichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosZurichComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosZurichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
