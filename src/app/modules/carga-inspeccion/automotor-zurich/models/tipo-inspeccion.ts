export class TipoInspeccion { //digital-auto, presencial-auto, hogar,etc.

  id: number;
  nombre: string;

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
}
