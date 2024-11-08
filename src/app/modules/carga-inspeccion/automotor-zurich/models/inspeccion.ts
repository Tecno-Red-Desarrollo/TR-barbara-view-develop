import { TipoInspeccion } from "./tipo-inspeccion";
import { Vehiculo } from "./vehiculo";

export class Inspeccion {

    id: number;
    tipo: TipoInspeccion;
    vehiculo: Vehiculo;

    constructor(id: number, tipo: TipoInspeccion, vehiculo: Vehiculo) {
        this.id = id;
        this.tipo = tipo;
        this.vehiculo = vehiculo;
    }
}
