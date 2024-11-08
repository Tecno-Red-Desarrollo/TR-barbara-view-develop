import { DetalleVehiculo } from "./detalle-vehiculo";
import { Documentacion } from "./documentacion";
import { Foto } from "./foto";

export class Vehiculo {
    dominio: string;
    anio: string;
    marca: string;
    modelo: string;
    tipo_id: string;//TipoVehiculo;
    tipo_descripcion: string;
    detalles: Array<DetalleVehiculo>;
    fotos: Array<Foto>;
    documentaciones: Array<Documentacion>;

    constructor(){
      this.dominio = '';
      this.anio = '';
      this.marca = '';
      this.modelo = '';
      this.tipo_id = '';
      this.tipo_descripcion = '';
      this.detalles = [];
      this.fotos = [];
      this.documentaciones = [];
    }
}
