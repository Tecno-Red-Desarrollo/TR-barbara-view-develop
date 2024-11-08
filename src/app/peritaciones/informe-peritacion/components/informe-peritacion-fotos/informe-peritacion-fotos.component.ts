import { Component, Input, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EncryptionService } from 'src/services/encryption.service';

@Component({
  selector: 'informe-peritacion-fotos',
  templateUrl: './informe-peritacion-fotos.component.html',
  styleUrls: ['./informe-peritacion-fotos.component.css']
})
export class InformePeritacionFotosComponent {
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
      this.openPhoto(index);
    }
  }

  hasClass(inspectionImageName: string): boolean {
    return inspectionImageName.includes('_1');
  }
}
