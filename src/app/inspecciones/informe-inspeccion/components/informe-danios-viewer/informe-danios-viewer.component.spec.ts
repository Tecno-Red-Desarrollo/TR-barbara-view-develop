import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDaniosViewerComponent } from './informe-danios-viewer.component';

describe('InformeDaniosViewerComponent', () => {
  let component: InformeDaniosViewerComponent;
  let fixture: ComponentFixture<InformeDaniosViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeDaniosViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeDaniosViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
