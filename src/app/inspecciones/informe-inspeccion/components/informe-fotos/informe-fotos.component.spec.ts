import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeFotosComponent } from './informe-fotos.component';

describe('InformeFotosComponent', () => {
  let component: InformeFotosComponent;
  let fixture: ComponentFixture<InformeFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
