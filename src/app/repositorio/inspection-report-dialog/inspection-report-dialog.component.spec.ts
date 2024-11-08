import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionReportDialogComponent } from './inspection-report-dialog.component';

describe('InspectionReportDialogComponent', () => {
  let component: InspectionReportDialogComponent;
  let fixture: ComponentFixture<InspectionReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionReportDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
