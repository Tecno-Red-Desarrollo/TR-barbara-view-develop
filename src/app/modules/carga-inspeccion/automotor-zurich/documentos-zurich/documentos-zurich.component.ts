import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { InspeccionStorageService } from '../services/inspeccion-storage.service';
import { Route } from '../helpers/Routes.enum';
import { ImageParamsStorageService } from '../services/imageParams-storage.service';
import { RetrievalService } from 'src/services/retrieval.service';
import { ConfigFotoService } from 'src/services/configFoto.service';

import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';
import { Documentacion } from '../models/documentacion';
import { Foto } from '../models/foto';
import { browserRefresh } from 'src/app/app.component';
const COMPONENT_NAME = 'documentos-zurich';

@Component({
  selector: 'app-documentos-zurich',
  templateUrl: './documentos-zurich.component.html',
  styleUrls: ['./documentos-zurich.component.css']
})
export class DocumentosZurichComponent implements OnDestroy, OnInit {

  private unsubscribe$: Subject<any> = new Subject<any>();

  ImageParams: any = {
    image : '',
    component : '',
    title: '',
    index: 0
  };
  inspeccion!: InspeccionDTO;
  documents: any = [];
  receivedObject!:string;
  uploadedFiles: any[] = [];

  imageAsBase64: string = '';
  component: string = '';

  showPdfIcon: boolean= false;
  displayInputFile: string = '';
  document_name:string = '';

  settingDocuments: any = [];

  public browserRefresh!: boolean;

  constructor(private router: Router,
              private configFotoService: ConfigFotoService,
              private dataService: InspeccionStorageService,
              private servicioImageParam: ImageParamsStorageService,
              private sanitizer: DomSanitizer,
              private retrievalService: RetrievalService) { }

  ngOnInit(): void {
    if(browserRefresh){
      this.router.navigate(['/carga-inspeccion/automotor-zurich/inicio'], { queryParams:
        {
          _userId: localStorage.getItem('_userId'),
          idRepo: localStorage.getItem('idRepo'),
          key: localStorage.getItem('key'),
          aseguradora: localStorage.getItem('aseguradora'),
          _token: localStorage.getItem('_token'),
          a: localStorage.getItem('a')
        }
      });
    }
    else {
      this.getInspectionObject();
      this.docsSettings();
      this.getImageAsBase64();
      this.showDocumentationsInspection();
    }
  }

  //Consumir la api sólo una vez. Para eso es mejor usar contador almacenado en el localStorage
  docsSettings() {
    if(this.settingDocuments.length === 0){
      this.configFotoService.getByAseguradoraId(this.inspeccion.aseguradora)
        .subscribe((res: any) => {
        this.settingDocuments = res.filter((x: { tipo: string }) => { return x.tipo === "Documentos" });
      });
    }
  }

  borderColor = (obligatorio: boolean) => { return obligatorio ? 'text-pink-500' : 'text-primary'; }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.showPdfIcon = true;
      this.document_name = file.name;

      this.displayInputFile = "hidden";

      //this.scanDocument(file);
    }
  }

  showDocumentationsInspection() {
    for(let i=0; i< this.inspeccion.inspeccion.vehiculo.documentaciones.length; i++)
      this.documents[i] = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.inspeccion.inspeccion.vehiculo.documentaciones[i]?.foto.imagenBase64}`);
    // this.certificateVTV = "./assets/images/iconPDF.png";
  }

  openWindowPhoto(mask: string, title: string, index: any): void {
    this.sendInspectionObject();
    this.router.navigate(['/carga-inspeccion/automotor-zurich/camara/'], { queryParams:
                                                                          {
                                                                            routeMask: `./assets/masks/documents/${mask}.png`,
                                                                            route: Route.ZURICH_DOCS,
                                                                            component: COMPONENT_NAME,
                                                                            title: title,
                                                                            imageId: index
                                                                          }
                                                                        });
  }

  saveImageAsBase64(ip: any): void {
    if(COMPONENT_NAME === ip.component){
      if(ip.image.length > 0) {
        let foto = new Foto().getInstance(ip.title, ip.image);
        this.inspeccion.inspeccion.vehiculo.documentaciones[ip.index] = new Documentacion(foto, ip.successfulScan);
      }
    }
  }

  scanDocument(image: any): void { /* Crearía un objeto response para especificar mejor la respuesta */
    this.retrievalService.scan(image).subscribe((response:any) => {
      if(this.validateQR(image) && this.validateOCR(image))
        console.log("Lectura de QR y OCR: OK");
      if(this.validateQR(image) && !this.validateOCR(image))
        console.log("No se leen los datos del OCR")
      if(!this.validateQR(image) || !this.validateOCR(image))
        console.log("Saque la foto de nuevo, señor!");
    });
  }

  validateQR = (data: any) => {
    //los datos del QR son "100%" precisos.
    return data.length > 0 ? data.dominio === this.inspeccion.inspeccion.vehiculo.dominio ? true : false : false;
  }

  validateOCR = (data: any) => {
    return data.length > 0 ? data.dominio.include(this.inspeccion.inspeccion.vehiculo.dominio) ? true : false : false;
  }

  getImageAsBase64(): void {
    this.servicioImageParam.source$
                      .pipe(takeUntil(this.unsubscribe$))
                      .subscribe((info: string[]) => {
                        this.ImageParams = { image : info[0], component : info[1], title: info[2], index: +info[3] }
                        //ANTES DE GUARDAR, VALIDAR CON RetrievalService
                      });
    this.saveImageAsBase64(this.ImageParams);
  }

  getInspectionObject() {
    this.dataService.source$.subscribe((object: string) => this.receivedObject = object);
    this.inspeccion = JSON.parse(`${this.receivedObject}`);
    console.log("Documentaciones: ", this.inspeccion);
  }

  sendInspectionObject() {
    let _inspeccion = JSON.stringify(this.inspeccion);
    this.dataService.changeSource(_inspeccion);
  }

  nextPage() {
    this.sendInspectionObject();
    this.router.navigate(['carga-inspeccion/automotor-zurich/finalizacion']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
