import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { buildDamagedPartsTree } from '../../helpers/buildDamagedPartsTree';
import { OverlayPanel } from 'primeng/overlaypanel';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'informe-danios-detalle',
  templateUrl: './informe-danios-detalle.component.html',
  styleUrls: ['./informe-danios-detalle.component.css']
})
export class InformeDaniosDetalleComponent implements OnInit {

  @Input('damages') damages: any;
  damagedPartsByGroups: TreeNode[];

  @Output('damageClick') damageClick = new EventEmitter();
  @Output('damageMouseOver') damageMouseOver = new EventEmitter();

  @ViewChild('damagePhotoPreview') damagePhotoPreview: OverlayPanel;

  currentDamagePhotoUrl: string;

  @Input('inspectionPhotos') inspectionPhotos: any[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['damages']) {
      // No mostramos los daños Manchado / Sucio ni daños en Tasas
      console.log(this.damages)
      this.damagedPartsByGroups = buildDamagedPartsTree(this.damages);
      this.expandAllNodes();
    }
  }

  getStyleColor(severity: string) {
    return new Map([['leve', 'back-yellow'], ['medio', 'back-orange'], ['severo', 'back-red']]).get(severity) || 'back-yellow'
  }

  expandAllNodes() {
    this.damagedPartsByGroups.forEach((node) => {
      node.expanded = true;
      if (node.children) {
        node.children.forEach((node) => {
          node.expanded = true;
        })
      }
    });
  }

  onDamageClick(photo: any) {
    return this.damageClick.emit(photo.client_request_name)
  }
  onDamageMouseOver(damage: any, target: any) {
    console.log()
    this.damageMouseOver.emit(damage.analisisFoto.client_request_name);
    let photo = this.inspectionPhotos.find((ph: any) => ph.nombre === damage.analisisFoto.client_request_name)
    if (photo) {
      this.currentDamagePhotoUrl = environment.url + 'api/foto/getPhotoWithDamagesBoxes/' + photo.id;
      this.damagePhotoPreview.toggle(target)
    }
  }

  nodeClick(node: any) {
    node.expanded = !node.expanded;
  }

}
