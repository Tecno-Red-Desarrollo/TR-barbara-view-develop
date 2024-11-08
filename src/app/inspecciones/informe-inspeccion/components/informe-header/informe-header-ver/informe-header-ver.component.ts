import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'informe-header-ver',
  templateUrl: './informe-header-ver.component.html',
  styleUrls: ['./informe-header-ver.component.css']
})
export class InformeHeaderVERComponent implements OnChanges {

  @Input('VER') VER: string = '';
  @Input('VERobject') VERobject: any = null;
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["VERobject"]) {
    }
  }

  isDigitWithAlert(digit: string) {
    return this.VERobject?.alerts && this.VERobject.alerts.find((d: any) => d.digit === digit)
  }

  getDigitClass(digit: string) {
    return this.isDigitWithAlert(digit) ? 'alert-digit' : ''
  }

  isVERwithObject(): boolean {
    return this.VERobject && typeof this.VERobject === 'object' && Object.keys(this.VERobject).length > 4
  }

}
