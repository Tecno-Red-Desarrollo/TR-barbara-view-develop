import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { buildDamagesPointsFromVerifeye, buildDamagesPointsFromBarbara } from '../../helpers/buildDamagesPoints';

@Component({
  selector: 'informe-danios-viewer',
  templateUrl: './informe-danios-viewer.component.html',
  styleUrls: ['./informe-danios-viewer.component.css']
})
export class InformeDaniosViewerComponent implements OnInit {

  @Input('damages') damages: any[];
  @Output('damageViewerFigureClick') damageViewerFigureClick = new EventEmitter()

  damagePoints: any[] = []
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['damages']) {
      this.damagePoints = buildDamagesPointsFromBarbara(this.damages);
    }
  }

  onFigureClick(figure: any) {
    this.damageViewerFigureClick.emit(figure);
  }



}
