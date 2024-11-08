import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { getAuditByText } from '../../helpers/getAuditByText';
import { checkInspectionAndRequestAreSames, isInspectionWithDamages } from '../../helpers/reportFunctions';
import { GoogleMapsLoaderService} from '../../GoogleMapsLoader.service'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'informe-header',
  templateUrl: './informe-header.component.html',
  styleUrls: ['./informe-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InformeHeaderComponent implements OnInit {

  @Input('inspection') inspection: any = {};

  tooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'left'
  }
  constructor(
    private googleMapsLoaderService : GoogleMapsLoaderService,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
  }

  showGeoInfoFail() {
    this.messageService.add({
      life: 6000,
      severity: 'warn',
      summary: 'Información',
      detail: 'Falló sistema GPS al momento de la realización de inspección.' });
  }

  checkInspectionAndRequestAreSames(key: string) {
    return checkInspectionAndRequestAreSames(this.inspection, key)
  }

  isInspectionWithDamages() {
    return isInspectionWithDamages(this.inspection);
  }

  getAuditByText(auditType: number) {
    return getAuditByText(auditType)
  }

  getVERAlertsText(): string {
    const publicVerDigit = new Map([

      ["anio", 'Año'],
      ["uso", 'Uso'],
      ["casco", 'Casco'],
      ["luces", 'Luces'],
      ["cristales", 'Cristales'],
      ["cubiertas", 'Cubiertas'],
      ["identificacion", 'Identificación'],
      ["seguridad", 'Seguridad'],
      ["combustible", 'Combustible'],
      ["vehiculo", 'Tipo veh.'],
      ["inspecciono", 'Inspeccionó'],
      ["fotos", 'Fotos'],
      ["pais", 'País'],
      ["depreciacion", 'Depreciación'],
      ["audito", 'Auditó']
    ])

    const alertText = this.inspection.VERobject.alerts.map((a: any) => `${publicVerDigit.get(a.digit)}`).join(' | ');
    return alertText;
  }

  isOldFormatPrice(price: any) {
    return price <= 999999
  }

  getFormatVehiclePrice(): string {
    let formatPrice = '';
    if (this.inspection.InspeccionVarios?.precio) {
      let priceNumber = this.isOldFormatPrice(this.inspection.InspeccionVarios?.precio) ? this.inspection.InspeccionVarios?.precio * 1000 : this.inspection.InspeccionVarios?.precio
      formatPrice = `Valor a fecha IP: $ ${priceNumber.toLocaleString('es-ES')}`
    }

    return formatPrice
  }

  getFormatDepreciation(): string {
    let formatDepreciation = '';
    if (this.inspection.InspeccionVarios?.danio && this.inspection.InspeccionVarios?.precio) {
      let priceNumber = this.isOldFormatPrice(this.inspection.InspeccionVarios?.precio) ? this.inspection.InspeccionVarios?.precio * 1000 : this.inspection.InspeccionVarios?.precio
      let depreciation = this.inspection.InspeccionVarios.danio * 100 / priceNumber
      formatDepreciation = `${Math.round(Number(depreciation))}% `
    }
    return formatDepreciation
  }

  mostrarInformacionMapa() {
    this.googleMapsLoaderService.toggleShowMapa();

    setTimeout(() => {
      const elemento = document.querySelector('.map-panel');
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500)
  }



}
