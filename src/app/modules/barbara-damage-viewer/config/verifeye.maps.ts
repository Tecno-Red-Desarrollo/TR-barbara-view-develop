import { Damages } from "./damages.enum";
import { InspektDamages } from "./inspekt-damages.enum";
import { InspektParts } from "./inspekt-parts.enum";
import { PartsGroups, PartsSubGroups, VERGroups } from "./parts-groups";
import { Parts } from "./parts.enum";

const inspektToVerifeyePartsMap = new Map([
    [InspektParts.FRONT_BUMPER, Parts.PARAGOLPE_DELANTERO_PANEL],

    [InspektParts.FRONT_BUMPER_COVER, Parts.PARAGOLPE_DELANTERO_PROTECTOR],

    [InspektParts.HOOD, Parts.CAPOT_PANEL],

    [InspektParts.FRONT_GLASS, Parts.PARABRISAS_CRISTAL],

    [InspektParts.BUMPER_GRILL_TOP, Parts.PARRILLA_SUPERIOR],

    [InspektParts.BUMPER_GRILL_BOTTOM, Parts.PARRILLA_INFERIOR],

    [InspektParts.LICENSE_PLATE, Parts.PLACA_PATENTE],

    [InspektParts.FRONT_PDC_SENSOR, Parts.PARAGOLPE_DELANTERO_SENSOR],

    [InspektParts.LEFT_FENDER, Parts.GUARDABARRO_DELANTERO_IZQUIERDA_PANEL],

    [InspektParts.RIGHT_FENDER, Parts.GUARDABARRO_DELANTERO_DERECHA_PANEL],

    [InspektParts.LEFT_WHEEL, undefined],

    [InspektParts.RIGHT_WHEEL, undefined],

    [InspektParts.LEFT_INDICATOR, Parts.OPTICA_TRASERA_IZQUIERDA_GIRO],

    [InspektParts.RIGHT_INDICATOR, Parts.OPTICA_TRASERA_DERECHA_GIRO],

    [InspektParts.LEFT_FENDER_EXTENDER, Parts.GUARDABARRO_DELANTERO_IZQUIERDA_MOLDURA],

    [InspektParts.RIGHT_FENDER_EXTENDER, Parts.GUARDABARRO_DELANTERO_DERECHA_MOLDURA],

    [InspektParts.LEFT_FRONT_DOOR, Parts.PUERTA_DELANTERA_IZQUIERDA_PANEL],

    [InspektParts.RIGHT_FRONT_DOOR, Parts.PUERTA_DELANTERA_DERECHA_PANEL],

    [InspektParts.LEFT_REAR_DOOR, Parts.PUERTA_TRASERA_IZQUIERDA_PANEL],

    [InspektParts.RIGHT_REAR_DOOR, Parts.PUERTA_TRASERA_DERECHA_PANEL],

    [InspektParts.LEFT_RUNNING_BOARD, Parts.ZOCALO_IZQUIERDA_CHAPA],

    [InspektParts.RIGHT_RUNNING_BOARD, Parts.ZOCALO_DERECHA_CHAPA],

    [InspektParts.LEFT_SIDE_VIEW_MIRROR, Parts.ESPEJO_IZQUIERDA_BOX],

    [InspektParts.RIGHT_SIDE_VIEW_MIRROR, Parts.ESPEJO_DERECHA_BOX],

    [InspektParts.LEFT_PILLAR_A, Parts.PARANTE_IZQUIERDA_A],

    [InspektParts.RIGHT_PILLAR_A, Parts.PARANTE_DERECHA_A],

    [InspektParts.LEFT_PILLAR_B, Parts.PARANTE_IZQUIERDA_B],

    [InspektParts.RIGHT_PILLAR_B, Parts.PARANTE_DERECHA_B],

    [InspektParts.LEFT_PILLAR_C, Parts.PARANTE_IZQUIERDA_C],

    [InspektParts.RIGHT_PILLAR_C, Parts.PARANTE_DERECHA_C],

    [InspektParts.LEFT_PILLAR_D, Parts.PARANTE_IZQUIERDA_D],

    [InspektParts.RIGHT_PILLAR_D, Parts.PARANTE_DERECHA_D],

    [InspektParts.LEFT_STAIR, Parts.ZOCALO_IZQUIERDA_ESTRIBO],

    [InspektParts.RIGHT_STAIR, Parts.ZOCALO_DERECHA_ESTRIBO],

    [InspektParts.LEFT_FRONT_DOOR_HANDLE, Parts.PUERTA_DELANTERA_IZQUIERDA_MANIJA],

    [InspektParts.LEFT_REAR_DOOR_HANDLE, Parts.PUERTA_TRASERA_IZQUIERDA_MANIJA],

    [InspektParts.RIGHT_FRONT_DOOR_HANDLE, Parts.PUERTA_DELANTERA_DERECHA_MANIJA],

    [InspektParts.RIGHT_REAR_DOOR_HANDLE, Parts.PUERTA_TRASERA_IZQUIERDA_MANIJA],

    [InspektParts.BACK_BUMPER, Parts.PARAGOLPE_TRASERO_PANEL],

    [InspektParts.BACK_BUMPER_COVER, Parts.PARAGOLPE_TRASERO_PROTECTOR],

    [InspektParts.TAIL_GATE, Parts.BAUL_PANEL],

    [InspektParts.BACK_GLASS, Parts.LUNETA_CRISTAL],

    [InspektParts.SPOILER, Parts.BAUL_SPOILER],

    [InspektParts.REAR_REFLECTOR_TOP, undefined],

    [InspektParts.LEFT_REAR_REFLECTOR_BOTTOM, undefined],

    [InspektParts.RIGHT_REAR_REFLECTOR_BOTTOM, undefined],

    [InspektParts.STEPNEY, undefined],

    [InspektParts.EMBLEM, Parts.LOGO_MARCA],

    [InspektParts.REAR_PDC_SENSOR, Parts.PARAGOLPE_TRASERO_SENSOR],

    [InspektParts.LEFT_QTR_PANEL, Parts.GUARDABARRO_TRASERO_IZQUIERDA_PANEL],

    [InspektParts.RIGHT_QTR_PANEL, Parts.GUARDABARRO_TRASERO_DERECHA_PANEL],

    [InspektParts.FUEL_DOOR, undefined], // TODO a definir

    [InspektParts.ROOF, Parts.TECHO_PANEL],

    [InspektParts.SUN_ROOF, Parts.ESCOTILLA_VIDRIO],

    [InspektParts.CARRIER, Parts.TECHO_PORTA_EQUIPAJE],

    [InspektParts.LEFT_SIDE_ROOF, Parts.TECHO_RIEL_IZQUIERDA_EQUIPAJE], // TODO a definir

    [InspektParts.RIGHT_SIDE_ROOF, Parts.TECHO_RIEL_DERECHA_EQUIPAJE], // TODO a definir

    [InspektParts.LEFT_QTR_EXTENDER, Parts.GUARDABARRO_TRASERO_IZQUIERDA_MOLDURA],

    [InspektParts.RIGHT_QTR_EXTENDER, Parts.GUARDABARRO_TRASERO_DERECHA_MOLDURA],

    [InspektParts.LEFT_TAILLIGHT, Parts.OPTICA_TRASERA_IZQUIERDA_INTEGRADA],

    [InspektParts.RIGHT_TAILLIGHT, Parts.OPTICA_TRASERA_DERECHA_INTEGRADA],

    [InspektParts.LEFT_HEADLIGHT, Parts.OPTICA_DELANTERA_IZQUIERDA_INTEGRADA],

    [InspektParts.RIGHT_HEADLIGHT, Parts.OPTICA_DELANTERA_DERECHA_INTEGRADA],

    [InspektParts.LEFT_FOG_LIGHT, Parts.OPTICA_TRASERA_IZQUIERDA_ANTINIEBLA],

    [InspektParts.RIGHT_FOG_LIGHT, Parts.OPTICA_TRASERA_DERECHA_ANTINIEBLA],

    [InspektParts.LEFT_REAR_WHEEL_RIM, Parts.TASA_TRASERA_IZQUIERDA],

    [InspektParts.RIGHT_REAR_WHEEL_RIM, Parts.TASA_TRASERA_DERECHA],

    [InspektParts.LEFT_FRONT_WHEEL_RIM, Parts.TASA_DELANTERA_IZQUIERDA],

    [InspektParts.RIGHT_FRONT_WHEEL_RIM, Parts.TASA_DELANTERA_DERECHA],

    [InspektParts.LEFT_FRONT_WINDOW_GLASS, Parts.CRISTAL_DELANTERO_IZQUIERDA_VENTANA],

    [InspektParts.LEFT_REAR_WINDOW_GLASS, Parts.CRISTAL_TRASERO_IZQUIERDA_VENTANA],

    [InspektParts.RIGHT_FRONT_WINDOW_GLASS, Parts.CRISTAL_DELANTERO_DERECHA_VENTANA],

    [InspektParts.RIGHT_REAR_WINDOW_GLASS, Parts.CRISTAL_TRASERO_DERECHA_VENTANA],

    [InspektParts.LEFT_QTR_WINDOW_GLASS, Parts.CRISTAL_TRASERO_IZQUIERDA_VENTILETE],

    [InspektParts.RIGHT_QTR_WINDOW_GLASS, Parts.CRISTAL_TRASERO_DERECHA_VENTILETE],

    [InspektParts.BUMPER_LIP, undefined],

    [InspektParts.DIFFUSOR, undefined],

    [InspektParts.LEFT_SIDESKIRTS, undefined],

    [InspektParts.RIGHT_SIDESKIRTS, undefined],

    [InspektParts.FRONT_BUMPER_PROTECTION_STRIP, Parts.PARAGOLPE_DELANTERO_PANEL],

    [InspektParts.REAR_BUMPER_PROTECTION_STRIP, Parts.PARAGOLPE_TRASERO_PANEL],

    [InspektParts.LICENSEPLATE_HOLDER, undefined],

    [InspektParts.TOW_HOOK_COVER, undefined],

    [InspektParts.LEFT_FRONT_DOOR_MOULDING, undefined],

    [InspektParts.LEFT_REAR_DOOR_MOULDING, undefined],

    [InspektParts.RIGHT_FRONT_DOOR_MOULDING, undefined],

    [InspektParts.RIGHT_REAR_DOOR_MOULDING, undefined]
]);

const partsGroupsMap = new Map([
    [Parts.LLANTA_DELANTERA_IZQUIERDA, { part_group: PartsGroups.CUBIERTA_DELANTERA_IZQUIERDA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],
    [Parts.LLANTA_DELANTERA_DERECHA, { part_group: PartsGroups.CUBIERTA_DELANTERA_DERECHA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],
    [Parts.LLANTA_TRASERA_IZQUIERDA, { part_group: PartsGroups.CUBIERTA_TRASERA_IZQUIERDA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],
    [Parts.LLANTA_TRASERA_DERECHA, { part_group: PartsGroups.CUBIERTA_TRASERA_DERECHA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],
    [Parts.BAUL_PANEL, { part_group: PartsGroups.BAUL_PORTON, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.BAUL_SPOILER, { part_group: PartsGroups.BAUL_PORTON, part_sub_group: PartsSubGroups.SPOILER, VER_group: VERGroups.CASCO }],
    [Parts.CAPOT_PANEL, { part_group: PartsGroups.CAPOT, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_DELANTERO_DERECHA_PANEL, { part_group: PartsGroups.GUARDABARRO_DELANTERO_DERECHO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_DELANTERO_DERECHA_MOLDURA, { part_group: PartsGroups.GUARDABARRO_DELANTERO_DERECHO, part_sub_group: PartsSubGroups.MOLDURA, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_DELANTERO_IZQUIERDA_MOLDURA, { part_group: PartsGroups.GUARDABARRO_DELANTERO_IZQUIERDO, part_sub_group: PartsSubGroups.MOLDURA, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_DELANTERO_IZQUIERDA_PANEL, { part_group: PartsGroups.GUARDABARRO_DELANTERO_IZQUIERDO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_TRASERO_DERECHA_MOLDURA, { part_group: PartsGroups.GUARDABARRO_TRASERO_DERECHO, part_sub_group: PartsSubGroups.MOLDURA, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_TRASERO_DERECHA_PANEL, { part_group: PartsGroups.GUARDABARRO_TRASERO_DERECHO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_TRASERO_IZQUIERDA_MOLDURA, { part_group: PartsGroups.GUARDABARRO_TRASERO_IZQUIERDO, part_sub_group: PartsSubGroups.MOLDURA, VER_group: VERGroups.CASCO }],
    [Parts.GUARDABARRO_TRASERO_IZQUIERDA_PANEL, { part_group: PartsGroups.GUARDABARRO_TRASERO_IZQUIERDO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.OPTICA_TRASERA_DERECHA_INTEGRADA, { part_group: PartsGroups.LUCES_TRASERAS, part_sub_group: PartsSubGroups.POSICION_DERECHA, VER_group: VERGroups.OPTICAS_LUCES }],//
    [Parts.OPTICA_TRASERA_DERECHA_ANTINIEBLA, { part_group: PartsGroups.LUCES_TRASERAS, part_sub_group: PartsSubGroups.ANTINIEBLAS_DERECHA, VER_group: VERGroups.OPTICAS_LUCES }],
    [Parts.OPTICA_TRASERA_IZQUIERDA_INTEGRADA, { part_group: PartsGroups.LUCES_TRASERAS, part_sub_group: PartsSubGroups.POSICION_IZQUIERDA, VER_group: VERGroups.OPTICAS_LUCES }],
    [Parts.OPTICA_TRASERA_IZQUIERDA_ANTINIEBLA, { part_group: PartsGroups.BAUL_PORTON, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.OPTICAS_LUCES }],
    [Parts.LUNETA_CRISTAL, { part_group: PartsGroups.LUNETA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.OPTICA_DELANTERA_DERECHA_INTEGRADA, { part_group: PartsGroups.LUZ_DELANTERA, part_sub_group: PartsSubGroups.POSICION_DERECHA, VER_group: VERGroups.OPTICAS_LUCES }],
    [Parts.OPTICA_DELANTERA_IZQUIERDA_INTEGRADA, { part_group: PartsGroups.LUZ_DELANTERA, part_sub_group: PartsSubGroups.POSICION_IZQUIERDA, VER_group: VERGroups.OPTICAS_LUCES }],
    [Parts.OPTICA_TRASERA_DERECHA_GIRO, { part_group: PartsGroups.LUZ_GIRO, part_sub_group: PartsSubGroups.DERECHO, VER_group: VERGroups.OPTICAS_LUCES }],
    [Parts.OPTICA_TRASERA_IZQUIERDA_GIRO, { part_group: PartsGroups.LUZ_GIRO, part_sub_group: PartsSubGroups.IZQUIERDA, VER_group: VERGroups.OPTICAS_LUCES }],
    [Parts.PARRILLA_INFERIOR, { part_group: PartsGroups.OTROS, part_sub_group: PartsSubGroups.PARRILLA_INFERIOR, VER_group: VERGroups.CASCO }],
    [Parts.PARRILLA_SUPERIOR, { part_group: PartsGroups.OTROS, part_sub_group: PartsSubGroups.PARRILLA_SUPERIOR, VER_group: VERGroups.CASCO }],
    [Parts.PARABRISAS_CRISTAL, { part_group: PartsGroups.PARABRISA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.PARAGOLPE_DELANTERO_PROTECTOR, { part_group: PartsGroups.PARAGOLPE_DELANTERO, part_sub_group: PartsSubGroups.PROTECTOR, VER_group: VERGroups.CASCO }],
    [Parts.PARAGOLPE_DELANTERO_SENSOR, { part_group: PartsGroups.PARAGOLPE_DELANTERO, part_sub_group: PartsSubGroups.SENSOR_ESTACIONAMIENTO, VER_group: VERGroups.ACCESORIOS }],
    [Parts.PARAGOLPE_DELANTERO_PANEL, { part_group: PartsGroups.PARAGOLPE_DELANTERO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.PARAGOLPE_TRASERO_SENSOR, { part_group: PartsGroups.PARAGOLPE_TRASERO, part_sub_group: PartsSubGroups.SENSOR_ESTACIONAMIENTO, VER_group: VERGroups.ACCESORIOS }],
    [Parts.PARAGOLPE_TRASERO_PANEL, { part_group: PartsGroups.PARAGOLPE_TRASERO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.PARAGOLPE_TRASERO_PROTECTOR, { part_group: PartsGroups.PARAGOLPE_TRASERO, part_sub_group: PartsSubGroups.PROTECTOR, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_DERECHA_A, { part_group: PartsGroups.PARANTE_DERECHO, part_sub_group: PartsSubGroups.PANEL_A, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_DERECHA_B, { part_group: PartsGroups.PARANTE_DERECHO, part_sub_group: PartsSubGroups.PANEL_B, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_DERECHA_C, { part_group: PartsGroups.PARANTE_DERECHO, part_sub_group: PartsSubGroups.PANEL_C, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_DERECHA_D, { part_group: PartsGroups.PARANTE_DERECHO, part_sub_group: PartsSubGroups.PANEL_D, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_IZQUIERDA_A, { part_group: PartsGroups.PARANTE_IZQUIERDO, part_sub_group: PartsSubGroups.PANEL_A, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_IZQUIERDA_B, { part_group: PartsGroups.PARANTE_IZQUIERDO, part_sub_group: PartsSubGroups.PANEL_B, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_IZQUIERDA_C, { part_group: PartsGroups.PARANTE_IZQUIERDO, part_sub_group: PartsSubGroups.PANEL_C, VER_group: VERGroups.CASCO }],
    [Parts.PARANTE_IZQUIERDA_D, { part_group: PartsGroups.PARANTE_IZQUIERDO, part_sub_group: PartsSubGroups.PANEL_D, VER_group: VERGroups.CASCO }],
    [Parts.ESPEJO_DERECHA_BOX, { part_group: PartsGroups.PUERTA_DELANTERA_DERECHA, part_sub_group: PartsSubGroups.ESPEJO, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_DELANTERA_DERECHA_MANIJA, { part_group: PartsGroups.PUERTA_DELANTERA_DERECHA, part_sub_group: PartsSubGroups.MANIJA, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_DELANTERA_DERECHA_PANEL, { part_group: PartsGroups.PUERTA_DELANTERA_DERECHA, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.CRISTAL_DELANTERO_DERECHA_VENTANA, { part_group: PartsGroups.PUERTA_DELANTERA_DERECHA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.ESPEJO_IZQUIERDA_BOX, { part_group: PartsGroups.PUERTA_DELANTERA_IZQUIERDA, part_sub_group: PartsSubGroups.ESPEJO, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_DELANTERA_IZQUIERDA_MANIJA, { part_group: PartsGroups.PUERTA_DELANTERA_IZQUIERDA, part_sub_group: PartsSubGroups.MANIJA, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_DELANTERA_IZQUIERDA_PANEL, { part_group: PartsGroups.PUERTA_DELANTERA_IZQUIERDA, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.CRISTAL_DELANTERO_IZQUIERDA_VENTANA, { part_group: PartsGroups.PUERTA_DELANTERA_IZQUIERDA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.PUERTA_TRASERA_IZQUIERDA_MOLDURA, { part_group: PartsGroups.PUERTA_TRASERA_IZQUIERDA, part_sub_group: PartsSubGroups.MOLDURA, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_TRASERA_DERECHA_MOLDURA, { part_group: PartsGroups.PUERTA_TRASERA_DERECHA, part_sub_group: PartsSubGroups.MOLDURA, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_TRASERA_DERECHA_MANIJA, { part_group: PartsGroups.PUERTA_TRASERA_DERECHA, part_sub_group: PartsSubGroups.MANIJA, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_TRASERA_DERECHA_PANEL, { part_group: PartsGroups.PUERTA_TRASERA_DERECHA, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.CRISTAL_TRASERO_DERECHA_VENTANA, { part_group: PartsGroups.PUERTA_TRASERA_DERECHA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.CRISTAL_TRASERO_DERECHA_VENTILETE, { part_group: PartsGroups.PUERTA_TRASERA_DERECHA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.PUERTA_TRASERA_IZQUIERDA_MANIJA, { part_group: PartsGroups.PUERTA_TRASERA_IZQUIERDA, part_sub_group: PartsSubGroups.MANIJA, VER_group: VERGroups.CASCO }],
    [Parts.PUERTA_TRASERA_IZQUIERDA_PANEL, { part_group: PartsGroups.PUERTA_TRASERA_IZQUIERDA, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.CRISTAL_TRASERO_IZQUIERDA_VENTANA, { part_group: PartsGroups.PUERTA_TRASERA_IZQUIERDA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.CRISTAL_TRASERO_IZQUIERDA_VENTILETE, { part_group: PartsGroups.PUERTA_TRASERA_IZQUIERDA, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.TECHO_RIEL_DERECHA_EQUIPAJE, { part_group: PartsGroups.TECHO, part_sub_group: PartsSubGroups.GUIA_EQUIPAJE_DERECHA, VER_group: VERGroups.CASCO }],
    [Parts.TECHO_RIEL_IZQUIERDA_EQUIPAJE, { part_group: PartsGroups.TECHO, part_sub_group: PartsSubGroups.GUIA_EQUIPAJE_IZQUIERDA, VER_group: VERGroups.CASCO }],
    [Parts.TECHO_PANEL, { part_group: PartsGroups.TECHO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.TECHO_PORTA_EQUIPAJE, { part_group: PartsGroups.TECHO, part_sub_group: PartsSubGroups.PORTAEQUIPAJE, VER_group: VERGroups.ACCESORIOS }],
    [Parts.ESCOTILLA_VIDRIO, { part_group: PartsGroups.TECHO, part_sub_group: PartsSubGroups.CRISTAL, VER_group: VERGroups.CRISTALES }],
    [Parts.ZOCALO_DERECHA_ESTRIBO, { part_group: PartsGroups.ZOCALO_DERECHO, part_sub_group: PartsSubGroups.ESTRIBO, VER_group: VERGroups.ACCESORIOS }],
    [Parts.ZOCALO_DERECHA_CHAPA, { part_group: PartsGroups.ZOCALO_DERECHO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],
    [Parts.ZOCALO_IZQUIERDA_ESTRIBO, { part_group: PartsGroups.ZOCALO_IZQUIERDO, part_sub_group: PartsSubGroups.ESTRIBO, VER_group: VERGroups.ACCESORIOS }],
    [Parts.ZOCALO_IZQUIERDA_CHAPA, { part_group: PartsGroups.ZOCALO_IZQUIERDO, part_sub_group: PartsSubGroups.PANEL, VER_group: VERGroups.CASCO }],

    [Parts.LOGO_MARCA, { part_group: PartsGroups.OTROS, part_sub_group: PartsSubGroups.LOGO_MARCA, VER_group: VERGroups.CASCO }],
    [Parts.PLACA_PATENTE, { part_group: PartsGroups.OTROS, part_sub_group: PartsSubGroups.PLACA_PATENTE, VER_group: VERGroups.CASCO }],
    [Parts.TASA_DELANTERA_DERECHA, { part_group: PartsGroups.CUBIERTA_DELANTERA_DERECHA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],
    [Parts.TASA_DELANTERA_IZQUIERDA, { part_group: PartsGroups.CUBIERTA_DELANTERA_IZQUIERDA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],
    [Parts.TASA_TRASERA_DERECHA, { part_group: PartsGroups.CUBIERTA_TRASERA_DERECHA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],
    [Parts.TASA_TRASERA_IZQUIERDA, { part_group: PartsGroups.CUBIERTA_TRASERA_IZQUIERDA, part_sub_group: PartsSubGroups.LLANTA_TASA, VER_group: VERGroups.CUBIERTAS_LLANTAS }],

]);

const inspektToVerifeyeDamagesMap = new Map([
    [InspektDamages.SCRATCH_OR_SPOT, Damages.RAYADO_LEVE],
    [InspektDamages.SHALLOW_DENT, Damages.ABOLLADO_LEVE],
    [InspektDamages.SHALLOW_DENT_MINOR, Damages.ABOLLADO_LEVE],
    [InspektDamages.DEEP_DENT, Damages.ABOLLADO_SEVERO],
    [InspektDamages.DESIGN_DENT, Damages.ABOLLADO_MEDIO],
    [InspektDamages.TEAR, Damages.ROTO],
    [InspektDamages.DISLOCATION, Damages.ROTO],// ?
    [InspektDamages.DISLOCATION_2, Damages.ROTO],// ?
    [InspektDamages.BROKEN, Damages.ROTO],
    [InspektDamages.STITCH_OR_SCREW, Damages.ROTO],// ?
    [InspektDamages.COLLISION_DAMAGE, Damages.ROTO], // ?
    [InspektDamages.SHATTER, Damages.RAJADO_MEDIO],
    [InspektDamages.RUST, Damages.PICADO_MEDIO],
    [InspektDamages.MISSING_PART, Damages.FALTANTE],
    [InspektDamages.CRACK, Damages.RAJADO_MEDIO],
    [InspektDamages.HOLE, Damages.ROTO],
    [InspektDamages.SPIDER_CORE, Damages.RAJADO_MEDIO],
    [InspektDamages.SPREAD, Damages.ROTO],
    [InspektDamages.AI_UNCERTAIN, Damages.INCIERTO],
    [InspektDamages.SPOT, Damages.MANCHADO_SUCIO],
    [InspektDamages.SPOT_OR_DIRT, Damages.MANCHADO_SUCIO]
]);


export {
    inspektToVerifeyePartsMap,
    partsGroupsMap,
    inspektToVerifeyeDamagesMap
}