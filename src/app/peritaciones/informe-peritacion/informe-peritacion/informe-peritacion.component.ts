import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsLoaderService } from 'src/app/inspecciones/informe-inspeccion/GoogleMapsLoader.service';
import { InspeccionesService } from 'src/app/inspecciones/inspecciones-service.service';
import { VerifeyeService } from 'src/services/VerifeyeService.service';
import { StorageService } from 'src/services/storage.service';
import { InformePeritacionFotosComponent } from '../components/informe-peritacion-fotos/informe-peritacion-fotos.component';
import { lastValueFrom } from 'rxjs';
import { isInspectionWithDamages } from '../helpers/reportFunctions';
import { getAuditByText } from '../helpers/getAuditByText';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { PeritacionesService } from '../../services/peritaciones.service';

@Component({
  selector: 'app-informe-peritacion',
  templateUrl: './informe-peritacion.component.html',
  styleUrls: ['./informe-peritacion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InformePeritacionComponent {

  peritacionId: string;
  peritacion: any;
  verifeyeAnalysis: any = {};
  @ViewChild('photos', { static: false }) photosComponent: InformePeritacionFotosComponent;

  observationsMessages: Message[] = [];
  observationsDefinicionInforme: string[] = [];

  sendToReviewDialogVisible = false;

  reviewObservations = "";

  apprasialMenuActions: MenuItem[] = [];

  apprasialState = 0;
  initialOfferPercent = 80;

  constructor(
    private peritacionesService: PeritacionesService,
    private verifeyeService: VerifeyeService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private googleMapsLoaderService: GoogleMapsLoaderService,
    private messageService: MessageService) {
    this.peritacionId = String(this.route.snapshot.params['id']);
    this.apprasialMenuActions = [
      {
        icon: 'pi pi-check',
        command: () => {
          this.finishApprasial()
        }
      },
      {
        icon: 'pi pi-send',
        command: () => {
          this.sendToReviewDialogVisible = true;
        }
      },
    ]
  }

  ngOnInit(): void {
    this.getPeritacion(this.peritacionId);

  }

  setObservationMessages(summary: string, detail: string) {
    this.observationsMessages.push({ severity: 'info', summary, detail })
  }

  setObservationDefinicionInforme(descripcion_informe: string) {
    this.observationsDefinicionInforme.push(descripcion_informe)
  }

  getAuditByText(auditType: number) {
    return getAuditByText(auditType)
  }

  getPeritacion(id: string) {
    this.peritacionesService.getPeritacionById(id).subscribe({
      next: (peritacion) => {
        if (peritacion.estado) this.apprasialState = peritacion.estado;
        if (peritacion.Inspeccion?.VerifeyeData && peritacion.Inspeccion?.VerifeyeData.id_verifeye) {

          const inspectionPhotos = peritacion.Inspeccion.Fotos || [];

          this.verifeyeService.getAnalysisById(peritacion.Inspeccion["VerifeyeData"].id_verifeye).subscribe({
            next: async (analisis) => {
              this.verifeyeAnalysis = analisis;

              try {

                for (let photo of this.verifeyeAnalysis.fotos) {
                  const blobImage = await lastValueFrom(this.verifeyeService.getAnalyzedPhoto(photo.id));
                  const dataImage = await this.createImageFromBlob(blobImage);
                  const inspectionPhoto = inspectionPhotos.find((iP: any) => iP.nombre === photo.client_request_name);

                  if (inspectionPhoto) {
                    inspectionPhoto.verifeyePhoto = dataImage;
                  }

                }
              } catch (e: any) {
                console.log(e.message)
              }
              this.setPeritacion(peritacion)

            }, error: (err) => {
              console.log(err)
            }
          })

        } else {

          this.setPeritacion(peritacion)
        }



      }, error: (err) => {
        console.log(err)
      }
    })
  }

  setPeritacion(peritacion: any) {
    this.peritacion = peritacion;

    /* if (this.inspection.ProcesoAuditoria && this.inspection.ProcesoAuditoria.length > 0) {
      this.inspection.ProcesoAuditoria.sort((a: any, b: any) => new Date(a.created_at) > new Date(b.created_at) ? 1 : -1);
      for (let pr of this.inspection.ProcesoAuditoria) {
        if (pr.ReglaAuditoriaGeneral?.visible_en_informe) {
          this.setObservationDefinicionInforme(pr.ReglaAuditoriaGeneral?.descripcion);
        }
        //console.log(new Date(pr.created_at).toLocaleTimeString())
      }
    } */

    if (this.peritacion.Inspeccion?.InspeccionVarios?.observaciones) this.setObservationMessages('Observaciones', this.peritacion.Inspeccion.InspeccionVarios.observaciones)

    if (this.peritacion.Inspeccion?.InspeccionVarios?.analisis_dominio || this.peritacion.Inspeccion?.InspeccionVarios?.analisis_marca || this.peritacion.Inspeccion?.InspeccionVarios?.analisis_modelo) {
      const AIObservation = `${this.peritacion.Inspeccion?.InspeccionVarios?.analisis_dominio || ''} ${this.peritacion.Inspeccion?.InspeccionVarios?.analisis_marca || ''} ${this.peritacion.Inspeccion?.InspeccionVarios?.analisis_modelo || ''}`
      this.setObservationMessages('Observaciones IA', AIObservation)
    }

    // if (this.inspection.InspeccionVarios?.latitud && this.inspection.InspeccionVarios?.longitud) {
    //   this.inspection.VERobject.fotos = "9";
    // }else {
    //   this.inspection.VERobject.fotos = "8";
    // }

    if (this.peritacion.Inspeccion?.VERobject && this.peritacion.Inspeccion?.VERobject.alerts?.length > 0) {
      for (let VERalert of this.peritacion.Inspeccion?.VERobject.alerts) {
        if (VERalert.message) this.setObservationMessages('', VERalert.message)
      }
    }

  }

  openPhotoByFileName(filename: any) {
    return this.photosComponent.openPhotoByFileName(filename)
  }

  openPhotoOverlayPanel(filename: any) {
    return
  }

  onDamageViewerFigureClicked(figure: any) {
    let tagId = new Map([
      ['front', 3],
      ['back', 4],
      ['up', 16],
      ['left', 1],
      ['right', 2]
    ]).get(figure)

    if (!tagId) return;
    return this.photosComponent.openPhotoByTagId(tagId)
  }

  isInspectionWithDamages() {
    return isInspectionWithDamages(this.peritacion.Inspeccion)
  }

  isInspectionWithObservations() {
    return this.observationsDefinicionInforme.length !== 0;
    /*       || this.inspection.InspeccionVarios?.analisis_dominio
          || this.inspection.InspeccionVarios?.analisis_marca
          || this.inspection.InspeccionVarios?.analisis_modelo */

  }

  isInspectionWithTrazability() {
    return this.peritacion.Inspeccion?.InspeccionVarios?.observaciones || (this.peritacion.Inspeccion?.ProcesoAuditoriaIA && this.peritacion.Inspeccion?.ProcesoAuditoriaIA?.length > 0)
  }

  isInspectionWithRequest() {
    return true
  }

  toggleMap() {
    return this.googleMapsLoaderService.toggleShowMapa()
  }

  get showMap() {
    return this.googleMapsLoaderService.showMap;
  }

  isUserWithPrivileges() {
    return [1027, 49, 104, 105, 102, 7446, 6268].some(uid => uid === this.storageService.getUserId())
  }

  private createImageFromBlob(image: Blob, i?: number) {
    return new Promise((resolve, reject) => {

      let reader = new FileReader();
      reader.addEventListener("load", () => {
        return resolve(String(reader.result))
      }, false);

      reader.readAsDataURL(image);
    })

  }

  openSendToReviewDialog() {
    this.sendToReviewDialogVisible = true;
  }

  sendApprasialToReview() {
    this.peritacionesService.sendApprasialToReview({ enc_id: this.peritacion.enc_id }).subscribe({
      next: (peritacion) => {
        this.apprasialState = 3;
        this.sendToReviewDialogVisible = false;
        this.messageService.add({ severity: 'info', summary: 'Estado', detail: 'Peritación enviada a revisión' });
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  finishApprasial() {
    console.log(this.peritacion.enc_id)
    this.peritacionesService.finishApprasial({ enc_id: this.peritacion.enc_id }).subscribe({
      next: (peritacion) => {
        this.apprasialState = 4;
        this.messageService.add({ severity: 'info', summary: 'Estado', detail: 'Peritación finalizada' });
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  isOldFormatPrice(price: any) {
    return price <= 999999
  }

  isOldFormatDamagePrice(price: any) {
    return price <= 99999
  }

  getFormatDamagePrice(): string {
    let formatPrice = '';
    if (this.peritacion.Inspeccion?.InspeccionVarios?.danio) {
      let priceNumber = this.peritacion.Inspeccion?.InspeccionVarios?.danio;
      formatPrice = `$${priceNumber.toLocaleString('es-ES')}`
    }

    return formatPrice
  }

  getFormatInitialOfferPrice(): string {
    let formatPrice = '';
    if (this.peritacion.Inspeccion?.InspeccionVarios?.danio) {
      let priceNumber = this.peritacion.Inspeccion?.InspeccionVarios?.danio * (this.initialOfferPercent / 100);
      formatPrice = `$${priceNumber.toLocaleString('es-ES')}`
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
}
