import { Component, Input, OnInit } from '@angular/core';
import { Severity } from '../config/severity.enum';

@Component({
  selector: '[damage-point]',
  templateUrl: './damage-point.component.html',
  styleUrls: ['./damage-point.component.css']
})
export class DamagePointComponent implements OnInit {

  @Input('x') xCord = 0;
  @Input('y') yCord = 0;
  @Input('severity') severity!: string;
  @Input('damagesCount') damagesCount: number;

  constructor() { }

  ngOnInit(): void {
  }

  getSeverityColor() {
    let colors: any = {
      [Severity.LEVE]: 'yellow',
      [Severity.MEDIO]: 'orange',
      [Severity.GRAVE]: 'red'
    }
    return colors[this.severity];
  }

  getSeverityTextColor() {
    let colors: any = {
      [Severity.LEVE]: 'black',
      [Severity.MEDIO]: 'black',
      [Severity.GRAVE]: 'white'
    }
    return colors[this.severity];
  }

}
