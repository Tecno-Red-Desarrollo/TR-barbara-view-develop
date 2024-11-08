import { DamagedPart } from "../models/damaged-part.model"
import { Severity } from "../../damage-viewer/config/severity.enum"
import { Part } from "../models/part.model"
import { Parts } from "../config/parts.enum"

export const damagePartsPoints = [
    new DamagedPart(new Part(Parts.PARAGOLPE_DELANTERO_PANEL), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.OPTICA_DELANTERA_IZQUIERDA_INTEGRADA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.OPTICA_DELANTERA_DERECHA_INTEGRADA), [], Severity.LEVE),

    // Lateral izquierdo
    new DamagedPart(new Part(Parts.LLANTA_DELANTERA_IZQUIERDA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.GUARDABARRO_DELANTERO_IZQUIERDA_PANEL), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.PUERTA_DELANTERA_IZQUIERDA_PANEL), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.CRISTAL_DELANTERO_IZQUIERDA_VENTANA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.ZOCALO_IZQUIERDA_CHAPA), [], Severity.LEVE),
    /*new DamagedPart(new Part(Parts.PUERTA_TRASERA_IZQUIERDA_), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.CRISTAL_TRASERO_IZQUIERDA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.RUEDA_TRASERA_IZQUIERDA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.GUARDABARRO_TRASERO_IZQUIERDA), [], Severity.LEVE),


    // Lateral derecho
    new DamagedPart(new Part(Parts.RUEDA_DELANTERA_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.GUARDABARRO_DELANTERO_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.PUERTA_DELANTERA_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.CRISTAL_DELANTERO_IZQUIERDA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.ZOCALO_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.PUERTA_TRASERA_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.CRISTAL_TRASERO_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.RUEDA_TRASERA_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.GUARDABARRO_TRASERO_DERECHA), [], Severity.LEVE),

    // Vista arriba
    new DamagedPart(new Part(Parts.CAPOT), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.PARABRISAS), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.ESPEJO_IZQUIERDA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.ESPEJO_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.PARABRISAS), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.TECHO), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.LUNETA), [], Severity.LEVE),

    // Atras
    new DamagedPart(new Part(Parts.OPTICA_TRASERA_IZQUIERDA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.OPTICA_TRASERA_DERECHA), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.BAUL_O_PORTON), [], Severity.LEVE),
    new DamagedPart(new Part(Parts.PARAGOLPE_TRASERO), [], Severity.LEVE),*/
]