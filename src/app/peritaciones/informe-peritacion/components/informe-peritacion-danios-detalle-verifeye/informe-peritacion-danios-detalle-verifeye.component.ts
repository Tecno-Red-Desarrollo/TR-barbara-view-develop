import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { buildDamagedPartsTreeFromVerifeyeDamages } from '../../helpers/buildDamagedPartsTree';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'informe-peritacion-danios-detalle-verifeye',
  templateUrl: './informe-peritacion-danios-detalle-verifeye.component.html',
  styleUrls: ['./informe-peritacion-danios-detalle-verifeye.component.css']
})
export class InformePeritacionDaniosDetalleVerifeyeComponent {

  @Input('damages') damages: any[];
  damagedPartsByGroups: TreeNode[];

  @Output('damageClick') damageClick = new EventEmitter();
  @Output('damageMouseOver') damageMouseOver = new EventEmitter();

  @ViewChild('damagePhotoPreview') damagePhotoPreview: OverlayPanel;

  currentDamagePhotoUrl: string;

  @Input('inspectionPhotos') inspectionPhotos: any[];

  constructor() { }

  ngOnInit(): void {
  }

  noDisplayDamagesFilter(dmg: any) {
    if (!dmg) return true;
    const noDisplayDamages = ['sucio'];

    return noDisplayDamages.some((s) => String(dmg.danio.nombre).toLowerCase().indexOf(s) === -1);
  }

  noDisplayPartsFilter(dmg: any) {
    if (!dmg) return true;
    const noDisplayParts = ['llanta'];

    return noDisplayParts.some((s) => String(dmg.parte.nombre).toLowerCase().indexOf(s) === -1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['damages']) {
      // No mostramos los daños Manchado / Sucio ni daños en Tasas
      this.damages = this.damages.filter(this.noDisplayPartsFilter).filter(this.noDisplayDamagesFilter);
      this.damagedPartsByGroups = buildDamagedPartsTreeFromVerifeyeDamages(this.damages);
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
