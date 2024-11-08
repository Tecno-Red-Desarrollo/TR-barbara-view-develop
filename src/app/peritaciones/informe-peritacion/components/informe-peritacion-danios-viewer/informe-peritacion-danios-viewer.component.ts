import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { buildDamagesPointsFromBarbara } from '../../helpers/buildDamagesPoints';

@Component({
  selector: 'informe-peritacion-danios-viewer',
  templateUrl: './informe-peritacion-danios-viewer.component.html',
  styleUrls: ['./informe-peritacion-danios-viewer.component.css']
})
export class InformePeritacionDaniosViewerComponent {
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
