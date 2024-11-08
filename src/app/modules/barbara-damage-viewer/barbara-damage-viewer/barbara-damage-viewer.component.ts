import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { DamageViewerComponent } from '../damage-viewer/viewer/viewer.component';

@Component({
  selector: 'barbara-damage-viewer',
  templateUrl: './barbara-damage-viewer.component.html',
  styleUrls: ['./barbara-damage-viewer.component.css']
})
export class BarbaraDamageViewerComponent extends DamageViewerComponent implements OnInit {

  constructor(renderer: Renderer2) {
    super(renderer)
  }

  override ngOnInit(): void {
  }

  override onFigureClick(figure: any): void {
    this.figureClickEvent.emit(figure)
  }

}
