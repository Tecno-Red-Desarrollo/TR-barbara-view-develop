export class Foto {

  etiqueta: string;
  imagenBase64: string;

  constructor(){
    this.etiqueta = '';
    this.imagenBase64 = '';
  }

  getInstance(etiqueta: string, imagenBase64: string): Foto {
      this.etiqueta = etiqueta;
      this.imagenBase64 = imagenBase64;

      return this;
  }
}
