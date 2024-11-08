import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptionService } from 'src/services/encryption.service';

@Component({
  selector: 'informe-fotos',
  templateUrl: './informe-fotos.component.html',
  styleUrls: ['./informe-fotos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InformeFotosComponent implements OnInit {

  activePhotoIndex = 0;
  displayCustom = false;
  apiHost = environment.url;
  encKey = environment.encKey;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  carouselResponsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 3,
      numScroll: 1
    }
  ];

  @Input('images') images: any[] = [];

  constructor(public encryptionService: EncryptionService) {
  }

  ngOnInit(): void {
    this.images.sort()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images']) {
      this.images.sort((a, b) => a.Etiqueta.id - b.Etiqueta.id)
    }
  }

  openPhoto(index: number) {
    this.activePhotoIndex = index;
    this.displayCustom = true;
  }

  openPhotoByFileName(filename: string) {
    const index = this.images.findIndex((img: any) => img.nombre === filename)
    if (index != -1) {
      this.openPhoto(index);
    }
  }

  openPhotoByTagId(tagId: number) {
    const index = this.images.findIndex((img: any) => img.Etiqueta.id === tagId)
    if (index != -1) {
      this.openPhoto(index);
    }
  }

  openPhotoById(photoId: number) {
    const index = this.images.findIndex((img: any) => img.id === photoId)
    if (index != -1) {
      const photo = this.images[index];
      if (this.isDocumentation(photo.nombre)) {
        window.open(this.getPhotoURL(photo), '_blank');
      } else {
        this.openPhoto(index);
      }
    }
  }

  isReinspectionPhoto(inspectionImageName: string): boolean {
    return inspectionImageName.includes('_1');
  }

  isDocumentation(photoName: string): boolean {
    if (String(photoName).indexOf('.pdf') != -1) return true;
    return false;
  }

  getPhotoURL(image: any) {
    let url = image.verifeyePhoto || this.apiHost + 'api/foto/getPhotoWithDamagesBoxes/' + image.id;
    if (this.isDocumentation(image.nombre)) url = this.apiHost + 'api/foto/getDocument/' + image.id;
    return url
  }

  getObservationText(image: any) {
    let obs = "";
    if (image.FotoCalidad?.observacion) obs = String(image.FotoCalidad?.observacion).split(',').map((o)=>`• ${o}\n`).join();
    return obs
  }

}
