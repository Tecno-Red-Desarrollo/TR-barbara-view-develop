import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { InspeccionesService } from '../../inspecciones-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifeyeService } from 'src/services/VerifeyeService.service';
import { InformeFotosComponent } from '../components/informe-fotos/informe-fotos.component';
import { Message } from 'primeng/api';
import { getAuditByText } from '../helpers/getAuditByText';
import { isInspectionWithDamages } from '../helpers/reportFunctions';
import { StorageService } from 'src/services/storage.service';
import { GoogleMapsLoaderService } from "../GoogleMapsLoader.service";
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-public-informe-inspeccion',
  templateUrl: './public-informe-inspeccion.component.html',
  styleUrls: ['./public-informe-inspeccion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PublicInformeInspeccionComponent implements OnInit {

  inspectionId: string;
  inspection: any;
  verifeyeAnalysis: any = {};
  @ViewChild('photos', { static: false }) photosComponent: InformeFotosComponent;

  observationsMessages: Message[] = [];
  observationsDefinicionInforme: string[] = [];

  constructor(
    private inspeccionesService: InspeccionesService,
    private verifeyeService: VerifeyeService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private googleMapsLoaderService: GoogleMapsLoaderService) {
    this.inspectionId = String(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.getInspection(this.inspectionId)
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

  getInspection(id: string) {
    this.inspeccionesService.getInspectionByPublicId(id).subscribe({
      next: (inspection) => {

        if (inspection["VerifeyeData"] && inspection["VerifeyeData"].id_verifeye) {

          const inspectionPhotos = inspection.Fotos || [];

          this.verifeyeService.getAnalysisById(inspection["VerifeyeData"].id_verifeye).subscribe({
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
              this.setInspection(inspection)

            }, error: (err) => {
              console.log(err)
            }
          })

        } else {

          this.setInspection(inspection)
        }



      }, error: (err) => {
        console.log(err)
      }
    })
  }

  setInspection(inspection: any) {
    this.inspection = inspection;

    if (this.inspection.ProcesoAuditoria && this.inspection.ProcesoAuditoria.length > 0) {
      this.inspection.ProcesoAuditoria.sort((a: any, b: any) => new Date(a.created_at) > new Date(b.created_at) ? 1 : -1);
      for (let pr of this.inspection.ProcesoAuditoria) {
        if (pr.ReglaAuditoriaGeneral?.visible_en_informe) {
          this.setObservationDefinicionInforme(pr.ReglaAuditoriaGeneral?.descripcion);
        }
        //console.log(new Date(pr.created_at).toLocaleTimeString())
      }
    }

    if (this.inspection.InspeccionVarios?.observaciones) this.setObservationMessages('Observaciones', this.inspection.InspeccionVarios?.observaciones)

    if (this.inspection.InspeccionVarios?.analisis_dominio || this.inspection.InspeccionVarios?.analisis_marca || this.inspection.InspeccionVarios?.analisis_modelo) {
      const AIObservation = `${this.inspection.InspeccionVarios?.analisis_dominio || ''} ${this.inspection.InspeccionVarios?.analisis_marca || ''} ${this.inspection.InspeccionVarios?.analisis_modelo || ''}`
      this.setObservationMessages('Observaciones IA', AIObservation)
    }

/*     if (this.inspection.InspeccionVarios?.latitud && this.inspection.InspeccionVarios?.longitud) {
      this.inspection.VERobject.fotos = "9";
    } else {
      this.inspection.VERobject.fotos = "8";
    } */

    if (this.inspection.VERobject && this.inspection.VERobject.alerts?.length > 0) {
      for (let VERalert of this.inspection.VERobject.alerts) {
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
    return isInspectionWithDamages(this.inspection)
  }

  isInspectionWithObservations() {
    return this.observationsDefinicionInforme.length !== 0;
    /*       || this.inspection.InspeccionVarios?.analisis_dominio
          || this.inspection.InspeccionVarios?.analisis_marca
          || this.inspection.InspeccionVarios?.analisis_modelo */

  }

  isInspectionWithTrazability() {
    return this.inspection.InspeccionVarios?.observaciones || (this.inspection.ProcesoAuditoriaIA && this.inspection.ProcesoAuditoriaIA?.length > 0)
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
}
