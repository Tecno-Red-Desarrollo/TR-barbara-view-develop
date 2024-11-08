import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'inspection-report-dialog',
    templateUrl: './inspection-report-dialog.component.html',
    styleUrls: ['./inspection-report-dialog.component.css'],
})
export class InspectionReportDialogComponent implements OnInit {

    @Input("inspectionId") inspectionId: string;
    @Input("visible") visible: boolean = false;
    @Output("onHide") onHideEvent = new EventEmitter()

    constructor() {
    }

    ngOnInit(): void {

    }

    hideDialog() {
        this.onHideEvent.emit(true)
    }



}