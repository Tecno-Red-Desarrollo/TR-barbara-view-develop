import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GoogleMapsLoaderService } from 'src/app/inspecciones/informe-inspeccion/GoogleMapsLoader.service';
import { checkInspectionAndRequestAreSames, isInspectionWithDamages } from '../../helpers/reportFunctions';
import { getAuditByText } from '../../helpers/getAuditByText';

@Component({
  selector: 'informe-peritacion-header',
  templateUrl: './informe-peritacion-header.component.html',
  styleUrls: ['./informe-peritacion-header.component.css']
})
export class InformePeritacionHeaderComponent {
  @Input('peritacion') peritacion: any = {};

  tooltipOptions = {
    showDelay: 150,
    autoHide: false,
    tooltipEvent: 'hover',
    tooltipPosition: 'left'
  }
  constructor(
    private googleMapsLoaderService: GoogleMapsLoaderService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  showGeoInfoFail() {
    this.messageService.add({
      life: 6000,
      severity: 'warn',
      summary: 'Información',
      detail: 'Falló sistema GPS al momento de la realización de inspección.'
    });
  }

  checkInspectionAndRequestAreSames(key: string) {
    return checkInspectionAndRequestAreSames(this.peritacion.Inspeccion, key)
  }

  isInspectionWithDamages() {
    return isInspectionWithDamages(this.peritacion.Inspeccion);
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

    const alertText = this.peritacion.Inspeccion?.VERobject.alerts.map((a: any) => `${publicVerDigit.get(a.digit)}`).join(' | ');
    return alertText;
  }

  isOldFormatPrice(price: any) {
    return price <= 999999
  }

  getFormatVehiclePrice(): string {
    let formatPrice = '';
    if (this.peritacion.Inspeccion?.InspeccionVarios?.precio) {
      let priceNumber = this.isOldFormatPrice(this.peritacion.Inspeccion?.InspeccionVarios?.precio) ? this.peritacion.Inspeccion?.InspeccionVarios?.precio * 1000 : this.peritacion.Inspeccion?.InspeccionVarios?.precio
      formatPrice = `Valor a fecha IP: $ ${priceNumber.toLocaleString('es-ES')}`
    }

    return formatPrice
  }

  getFormatDepreciation(): string {
    let formatDepreciation = '';
    if (this.peritacion.Inspeccion?.InspeccionVarios?.danio && this.peritacion.Inspeccion?.InspeccionVarios?.precio) {
      let priceNumber = this.isOldFormatPrice(this.peritacion.Inspeccion?.InspeccionVarios?.precio) ? this.peritacion.Inspeccion?.InspeccionVarios?.precio * 1000 : this.peritacion.Inspeccion?.InspeccionVarios?.precio
      let depreciation = this.peritacion.Inspeccion?.InspeccionVarios.danio * 100 / priceNumber
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

  openHistory() {
    window.open('https://tst.barbara.com.ar/api/inspeccion/report/' + this.peritacion.antecedente_id, '_blank')
  }
}
