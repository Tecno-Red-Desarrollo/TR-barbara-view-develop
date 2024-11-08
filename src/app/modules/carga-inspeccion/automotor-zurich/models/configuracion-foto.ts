export class ConfiguracionFoto {
  id: number;
  archivo: string;
  obligatoria: boolean;
  etiqueta: string;
  tipo: string;

  constructor(id: number, archivo: string, obligatoria: boolean, etiqueta: string, tipo: string){
    this.id = id;
    this.archivo = archivo;
    this.obligatoria = obligatoria;
    this.etiqueta = etiqueta;
    this.tipo = tipo;
  }
}
