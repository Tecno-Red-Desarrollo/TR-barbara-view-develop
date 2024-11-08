import { Parts } from "../config/parts.enum";
import { SensoraiParts } from "./sensorai-parts.enum";

/**
 * Recibe un nombre de parte de Sensorai y devuelve el correspondiente de Verifeye
 * @param sensoraiPart 
 * @returns 
 */
export function sensoraiToVerifeyePartName(sensoraiPart: SensoraiParts): Parts | null {
    switch (sensoraiPart) {
        case
            SensoraiParts.FRONT_WINDSHIELD:
            return Parts.PARABRISAS_CRISTAL;

        case
            SensoraiParts.HOOD,
            SensoraiParts.LOGO:

            return Parts.CAPOT_PANEL;

        case
            SensoraiParts.GRILLE,

            SensoraiParts.GRATES,
            SensoraiParts.FRONT_BUMPER,
            SensoraiParts.LEFT_FOGLIGHT:

            return Parts.PARAGOLPE_DELANTERO_PANEL;

        case
            SensoraiParts.LEFT_LIGHT:
            return Parts.OPTICA_DELANTERA_IZQUIERDA_INTEGRADA;

        case
            SensoraiParts.WHEELBROW,
            SensoraiParts.PLATE:
            return null;

        case
            SensoraiParts.LEFT_FRONT_TIRE:
            return Parts.LLANTA_DELANTERA_IZQUIERDA;

        case
            SensoraiParts.LEFT_FRONT_WING:
            return Parts.GUARDABARRO_DELANTERO_IZQUIERDA_PANEL;

        case
            SensoraiParts.LEFT_FRONT_DOOR:
            return Parts.PUERTA_DELANTERA_IZQUIERDA_PANEL;

        case
            SensoraiParts.LEFT_DOORSILL:
            return Parts.ZOCALO_IZQUIERDA_CHAPA;

        case
            SensoraiParts.LEFT_REAR_DOOR:
            return Parts.PUERTA_TRASERA_IZQUIERDA_PANEL;

        case
            SensoraiParts.LEFT_REAR_WING:
            return Parts.GUARDABARRO_TRASERO_IZQUIERDA_PANEL;

        case
            SensoraiParts.LEFT_TAIL_LIGHT:
            return Parts.OPTICA_TRASERA_IZQUIERDA_INTEGRADA;

        case
            SensoraiParts.LEFT_MIRROR:
            return Parts.ESPEJO_IZQUIERDA_BOX;

        case
            SensoraiParts.LEFT_FRONT_WINDOW:
            return Parts.CRISTAL_DELANTERO_IZQUIERDA_VENTANA;

        case
            SensoraiParts.LEFT_REAR_WINDOW:
            return Parts.CRISTAL_TRASERO_IZQUIERDA_VENTANA;


        case
            SensoraiParts.REAR_WINDSHIELD:
            return Parts.LUNETA_CRISTAL;

        case
            SensoraiParts.DECKLID:
            return Parts.BAUL_PANEL;

        case
            SensoraiParts.REAR_BUMPER:
            return Parts.PARAGOLPE_TRASERO_PANEL;

        case
            SensoraiParts.RIGHT_TAIL_LIGHT:
            return Parts.OPTICA_TRASERA_DERECHA_INTEGRADA;

        case
            SensoraiParts.RIGHT_REAR_WINDOW:
            return Parts.GUARDABARRO_TRASERO_DERECHA_PANEL;

        case
            SensoraiParts.RIGHT_REAR_TIRE:
            return Parts.LLANTA_TRASERA_DERECHA;

        case
            SensoraiParts.RIGHT_REAR_DOOR:
            return Parts.PUERTA_TRASERA_DERECHA_PANEL;

        case
            SensoraiParts.RIGHT_REAR_WINDOW:
            return Parts.CRISTAL_TRASERO_DERECHA_VENTANA;

        case
            SensoraiParts.RIGHT_FRONT_WINDOW:
            return Parts.CRISTAL_DELANTERO_DERECHA_VENTANA;

        case
            SensoraiParts.RIGHT_DOORSILL:
            return Parts.ZOCALO_DERECHA_CHAPA;

        case
            SensoraiParts.RIGHT_FRONT_DOOR:
            return Parts.PUERTA_DELANTERA_DERECHA_PANEL;

        case
            SensoraiParts.RIGHT_FRONT_TIRE:
            return Parts.LLANTA_DELANTERA_DERECHA;

        case
            SensoraiParts.RIGHT_FRONT_WING:
            return Parts.GUARDABARRO_DELANTERO_DERECHA_PANEL;

        case
            SensoraiParts.RIGHT_LIGHT:
            return Parts.OPTICA_DELANTERA_DERECHA_INTEGRADA;

        case
            SensoraiParts.RIGHT_MIRROR:
            return Parts.ESPEJO_DERECHA_BOX;
            
        default:
            return null;
    }
}