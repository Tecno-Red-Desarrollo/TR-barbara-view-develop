import { PartsGroups, PartsSubGroups } from "../../verifeye-damage-viewer/config/parts-groups";
import { Parts } from "../../verifeye-damage-viewer/config/parts.enum";

export class Part {
    name: Parts;
    groups?: any;
    parte?: any;
    nombre?: string;
    componente?: string;

    constructor(name: Parts, parte?: any) {
        this.parte = parte;
        this.name = name;
        if (parte) {
            this.nombre = parte.nombre.nombre;
            this.componente = parte.componente.nombre;
        }
    }
}