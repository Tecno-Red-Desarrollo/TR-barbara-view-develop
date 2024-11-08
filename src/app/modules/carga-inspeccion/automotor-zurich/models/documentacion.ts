import { Foto } from "./foto";
import { TipoDocumentacion } from "./tipo-documentacion";

export class Documentacion {

    foto: Foto;
    successfulScan: boolean;

    constructor(foto: Foto, successfulOCR: boolean) {
        this.foto = foto;
        this.successfulScan = successfulOCR;
    }
}
