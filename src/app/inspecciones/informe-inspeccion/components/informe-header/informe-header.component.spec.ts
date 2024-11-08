import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeHeaderComponent } from './informe-header.component';

describe('InformeHeaderComponent', () => {
  let component: InformeHeaderComponent;
  let fixture: ComponentFixture<InformeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
