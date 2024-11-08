import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  DataUrl,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';

import { InspeccionStorageService } from '../services/inspeccion-storage.service';
import { ImageParamsStorageService } from '../services/imageParams-storage.service';

import { LocationService } from 'src/services/location.service';
import { InspeccionService } from '../services/inspeccion.service';

import { Route } from '../helpers/Routes.enum';

import { Foto } from '../models/foto';
import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';

import { PhotosBL } from '../models/contracts/photosBL';
import { browserRefresh } from 'src/app/app.component';
import { UserInspectorService } from '../services/user-inspector.service';

import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Channel } from '../helpers/Channels.enum';

declare var piexif: any;

const COMPONENT_NAME = 'fotos-zurich';

@Component({
  selector: 'app-fotos-zurich',
  templateUrl: './fotos-zurich.component.html',
  styleUrls: ['./fotos-zurich.component.css']
})
export class FotosZurichComponent implements OnInit, OnDestroy {
  ImageParams: any = {
    image: '',
    component: '',
    title: '',
    index: 0
  };
  inspeccionDTO!: InspeccionDTO;
  photoConfigs: any = [];
  paramsUrl: any = {};

  displayPosition!: boolean;
  position!: string;
  indicativePictureByArchivo!: string;
  indexSettingPhoto!: any;
  titlePhoto!: string;

  blocked = false;

  imgResultAfterResize: DataUrl = ''
  selectedFile: any;

  locationServiceSubscription!: Subscription;
  onInitLocation = true;

  displaySendingIP = false;

  constructor(private router: Router,
    private inspeccionService: InspeccionService,
    private locationService: LocationService,
    private dataService: InspeccionStorageService,
    private messageService: MessageService,
    private imageParamsStorageService: ImageParamsStorageService,
    private sanitizer: DomSanitizer,
    private imageCompress: NgxImageCompressService,
    private userInspectorService: UserInspectorService) { }

  ngOnInit(): void {
    if (browserRefresh) {
      this.router.navigate([Route.ZURICH_STARTING_POINT], {
        queryParams:
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
      console.log(this.userInspectorService.isAsegurado())
      this.getInspectionObject();
      this.photoConfigurations();
      this.getImageAsBase64();
      console.log("InspeccionDTO FOTOS: ", this.inspeccionDTO);
      this.getLocation();

      this.locationServiceSubscription = this.locationService.permissionGranted$.subscribe((granted) => {
        if ((this.inspeccionDTO.obligaGeo || this.userInspectorService.isAsegurado()) && granted && !this.onInitLocation) {
          console.log(granted)
          this.blocked = false;
          this.messageService.clear();
          this.getLocation();
        } else if (!this.onInitLocation) {
          //this.blocked = true;
          if (this.userInspectorService.isAsegurado()) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Es necesario que enciendas y aceptes la Geolocalización', sticky: true })
          }
        }

        if (this.onInitLocation) this.onInitLocation = false;

      });
    }
  }

  ngOnDestroy() {
    if (this.locationServiceSubscription) this.locationServiceSubscription.unsubscribe();
  }

  closeDisplayPosition(show: boolean): void {
    if (!show) {
      //this.openInputFile(this.indexSettingPhoto);
      this.displayPosition = false;
      // this.uploadAndResize(this.indexSettingPhoto, this.titlePhoto);
    }
  }

  showPositionDialog(position: string, archivo: string, i: any, tipoVehiculo: string): void {
    this.indexSettingPhoto = i;
    this.titlePhoto = archivo;

    if (this.userInspectorService.isAsegurado()) {
      this.position = position;
      this.displayPosition = true;
      this.indicativePictureByArchivo = PhotosBL.putIndicativePicture(archivo, tipoVehiculo);
    } else {
      this.uploadAndResize(this.indexSettingPhoto, this.titlePhoto);
    }
  }

  selectFile(event: any) {
    var fileName: any;
    this.selectedFile = event.target.files[0];
    fileName = this.selectedFile['name'];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        let localUrl = event.target.result;
        this.uploadAndResize(localUrl, fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // putIndicativePicture(archivo: string, tipoVehiculo: string): string {
  //   if(tipoVehiculo.includes("AUTOMOVIL" || "CAMIONETA")){
  //     this.indicativePictureByArchivo = `./assets/indicative_pictures/auto/${archivo}.png`
  //   }
  //   else {
  //     this.indicativePictureByArchivo = `./assets/indicative_pictures/moto/${archivo}.png`
  //   }
  //   return this.indicativePictureByArchivo;
  // }

  getLocation() {

    this.locationService.getPosition().then(pos => {
      this.inspeccionDTO.latitud = pos.latitude;
      this.inspeccionDTO.longitud = pos.longitude;
    }).catch(err => {
      if ((this.inspeccionDTO.obligaGeo || this.userInspectorService.isAsegurado())) {

        //this.blocked = true;
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Es necesario que enciendas y aceptes la Geolocalización', sticky: true })

      }
    });

  }

  /* Muestra las fotos cargadas */
  getAsSafeUrlImage(i: number) {
    let safeUrlImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${this.inspeccionDTO.inspeccion.vehiculo.fotos[i]?.imagenBase64}`);
    return safeUrlImage;
  }

  photoConfigurations(): void {
    let photos = this.inspeccionDTO.fotos;
    let details = this.inspeccionDTO.inspeccion.vehiculo.detalles;
    this.photoConfigs = PhotosBL.SetAllPhotoConfigurations(photos, details);
  }

  borderColor = (obligatorio: boolean) => { return obligatorio ? 'text-pink-500' : 'text-primary'; }

  //Solución temporal: Hay que refactorizar código.
  assignRouteMask(tipoVehiculo: string, mask: string): string {
    let route: string = '';
    switch (tipoVehiculo) {
      case 'AUTOMOVIL 4/5 P':
        route = `./assets/masks/auto/4puertas/${mask}.png?v1`;
        break;
      case 'AUTOMOVIL COUPE 2/3 P':
        route = '';
        break;
      case 'PICK-UP CABINA DOBLE' || 'PICK-UP CABINA SIMPLE' || 'CAMIONETA':
        route = `./assets/masks/pickup/${mask}.png`;
        break;
      default:
        route = ''
        break;
    }
    return route;
  }

  openWindowPhoto(mask: string, title: string, index: any): void {
    this.sendInspectionObject();
    this.router.navigate(['/carga-inspeccion/automotor-zurich/camara/'],
      {
        queryParams:
        {
          routeMask: this.assignRouteMask(this.inspeccionDTO.inspeccion.vehiculo.tipo_descripcion, mask),
          route: Route.ZURICH_PHOTOS,
          component: COMPONENT_NAME,
          title: title,
          imageId: index
        }
      });
  }

  saveImageAsBase64(ip: any): void {
    if (COMPONENT_NAME === ip.component) {
      if (ip.image.length > 0)
        this.inspeccionDTO.inspeccion.vehiculo.fotos[ip.index] = new Foto().getInstance(ip.title, ip.image);
    }
  }

  getImageAsBase64(): void {
    this.imageParamsStorageService.source$
      .subscribe((info: string[]) => {
        this.ImageParams = { image: info[0], component: info[1], title: info[2], index: +info[3] }
      });
    this.saveImageAsBase64(this.ImageParams);
  }

  getInspectionObject = () => { this.dataService.source$.subscribe((object: string) => this.inspeccionDTO = JSON.parse(object)); }

  sendInspectionObject(): void {
    let _inspeccion = JSON.stringify(this.inspeccionDTO);
    this.dataService.changeSource(_inspeccion);
  }

  nextPage(): void {
    let photos = this.inspeccionDTO.inspeccion.vehiculo.fotos;
    if (PhotosBL.ValidateCompleteMandatoryImages(this.photoConfigs, photos)) {
      this.sendInspectionObject();
      // TODO: hacer condicional según aseguradora.
      let cargaDocumentos = false;
      if (cargaDocumentos) {
        this.router.navigate([Route.ZURICH_DOCS]);
      }
      // FIXME Se comenta el envío de inspección para la Demo del 13/4.
      // let result = this.inspeccionService.endInspeccion(this.inspeccionDTO);
      this.displaySendingIP = true;

      // Si el canal es 0 guardamos el canal correspondiente segun quién haya inspeccionado
      if (this.inspeccionDTO.canal == Channel.CANAL_0) {

        this.inspeccionDTO.canal = this.userInspectorService.isAsegurado() ? Channel.CANAL_4 : Channel.CANAL_3;

      }

      this.inspeccionService.endInspeccion(this.inspeccionDTO).subscribe({
        next: (res: any) => {
          console.log("Finalizado", res);
          let barbara_id = res.barbara_id;
          this.router.navigate([Route.ZURICH_ENDED], { queryParams: { idBarbara: barbara_id } });
        },
        error: (err: any) => {
          this.displaySendingIP = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo completar la inspección: ' + err.error.message, life: 5000 });
        }
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingresar todas las fotos obligatorias, por favor.' });
    }
  }

  uploadAndResize(fotoIndex: number, title: string) {
    this.displayPosition = false;
    let onlyCamera = this.userInspectorService.isAsegurado();
    return this.imageCompress
      .uploadFile(onlyCamera)
      .then(({ image, orientation }: UploadResponse) => {

        // Obtenemos los metadatos y los guardamos porque se perderán al comprimir la foto
        let originalExifObject = piexif.load(image);
        // seteamos orientación en 1 porque en la compresión por canvas se reescribe y la orientación de entrada ya no tiene validez
        originalExifObject["0th"][piexif.ImageIFD.Orientation] = 1;

        let originalExifBytes = piexif.dump(originalExifObject);

        // console.warn('Tamaño en bytes original:', this.imageCompress.byteCount(image));
        // console.warn('Comprimiendo y modificando tamaño a 1280px de ancho y 720px de alto...');

        this.imageCompress
          .compressFile(image, orientation, 100, 90, 1280, 720) //Relación de fotos en píxeles 1280 x 720 (HD)
          .then((result: DataUrl) => {

            // Insertamos los metadatos en la imagen ya comprimida
            let inserted = piexif.insert(originalExifBytes, result);
            let base64Result = inserted.split(',')[1];

            this.inspeccionDTO.inspeccion.vehiculo.fotos[fotoIndex] = new Foto().getInstance(title, base64Result);
            this.sendInspectionObject();
            console.log(this.inspeccionDTO);
            // console.warn(
            //   'Tamaño en bytes actual es:',
            //   this.imageCompress.byteCount(result)
            // );
          });
      });
  }

  deleteImage(e: any, fotoIndex: number) {
    e.stopPropagation();
    this.inspeccionDTO.inspeccion.vehiculo.fotos.splice(fotoIndex, 1);
    this.sendInspectionObject();
  }

}
