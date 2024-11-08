import { Severity } from "../../damage-viewer/config/severity.enum";
import { DamagedPart } from "../models/damaged-part.model";
import { Part } from "../models/part.model";
import { sensoraiToVerifeyePartName } from "./verifeye-sensorai-merge-parts.function";
import { getPartGroups, getVerifeyeDamage, inspektToVerifeyePartName } from "./verifeye-inspekt-merge-parts.function";
import { Damage } from "../models/damage.model";

export function getSeverityByScore(score: number): Severity {

    const severityMap = new Map();
    severityMap.set(Severity.LEVE, 0.3);
    severityMap.set(Severity.MEDIO, 0.6);
    severityMap.set(Severity.GRAVE, 1);

    let severity = Severity.LEVE;

    if (score <= severityMap.get(Severity.LEVE)) return severity;

    if (score <= severityMap.get(Severity.MEDIO)) {

        severity = Severity.MEDIO

    } else {

        severity = Severity.GRAVE

    }
    return severity;

}

/**
 * Recibe una lista de daños y los agrupa por partes
 * @param list Lista de daños
 */
export function groupDamagesPart(list: any[]): Array<DamagedPart> {
    // Filtramos para que nos quede solo un array de las partes involucradas (unicas) dado que en la lista tenemos partes repetidas
    const parts = new Set(list.map(d => d.damage_location));

    const damagedParts: DamagedPart[] = [];

    // Recorremos el array de las partes con daños y buscamos en la lista la parte para agrupar sus daños
    for (let p of parts) {
        const verifeyePartName = sensoraiToVerifeyePartName(p);

        if (verifeyePartName) {
            const listOfDamages = list.filter(d => d.damage_location === p).map(d => d.damage_category);
            const part = new Part(verifeyePartName);
            damagedParts.push(new DamagedPart(part, listOfDamages, Severity.MEDIO));
        }
    }

    // Devolvemos el array de partes dañadas con sus respectivos daños
    return damagedParts;
}

export function castInspektToVerifeyeDamages(damagedParts: any[]): DamagedPart[] {
    const castedDamagedParts: DamagedPart[] = [];
    // Recorremos el array de las partes con daños para generar los dtos
    for (let p of damagedParts) {
        const verifeyePartName = inspektToVerifeyePartName(p.partName);

        if (verifeyePartName) {
            const part = new Part(verifeyePartName);
            part.groups = getPartGroups(verifeyePartName);
            let damages = p.listOfDamages;

            if (damages) {
                if (typeof damages === 'string') damages = damages.split(',').map(s => s.trim());
                const listOfDamages = damages.map((tipo: any) => {
                    const verifeyeDamage: any = getVerifeyeDamage(tipo);
                    const damage = new Damage(verifeyeDamage || tipo, part, p.damageSeverityScore);
                    return damage;

                });
                castedDamagedParts.push(new DamagedPart(part, listOfDamages, getSeverityByScore(p.damageSeverityScore)));
            }
        }
    }

    return castedDamagedParts
}
export function castToVerifeyeDamages(damagedParts: any[], damages: any[]): DamagedPart[] {
    const castedDamagedParts: DamagedPart[] = [];
    // Recorremos el array de las partes con daños para generar los dtos
    for (let p of damagedParts) {
        const part = new Part(p.parte.nombre, p.parte);

        if (damages) {
            const listOfDamages = damages.filter((dmg) => dmg.parte.id === p.parte.id).map((dmg: any) => {
                const damage = new Damage(String(dmg.danio.nombre).toLowerCase(), part, dmg.severity_score);
                return damage;

            });
            castedDamagedParts.push(new DamagedPart(part, listOfDamages, p.severidad.nombre));
        }
    }

    return castedDamagedParts
}

/**
 * Devuelve el nombre de la parte en castellano
 */
export function getPartName() {

}

/**
 * Devuelve el nombre del daño en castellano
 */
export function getDamageName() {

}
