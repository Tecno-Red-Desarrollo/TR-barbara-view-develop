import { PartCoordsAutomovil } from "src/app/modules/barbara-damage-viewer/config/coordsByVehicle/part-coords-automovil.config";
import { DamagePoint } from "src/app/modules/barbara-damage-viewer/damage-viewer/models/damage-point";
import { getBarbaraSeverityBySeverityId, getMajorSeverity, getSeverityColor } from "./severityFunctions";
import { DamagesConfig, DamagesConfigByCode } from "src/app/modules/barbara-damage-viewer/config/damages";

export function buildDamagesPointsFromVerifeye(damages: any[]): DamagePoint[] {
    const damagesPoints: DamagePoint[] = [];

    let damagedPartsGroupsKeys: any = new Set(damages.map(dwp => dwp.parte.nombre.nombre));

    for (let dpGroupKey of damagedPartsGroupsKeys) {
        let damagesOfGroupPart = damages.filter(dwp => dwp.parte.nombre.nombre === dpGroupKey)
        const majorSeverity = getMajorSeverity(damagesOfGroupPart);
        const someMajorDamage = damagesOfGroupPart.find(dp => dp.danio.severidad.id === majorSeverity);
        if (someMajorDamage) {
            const coords = PartCoordsAutomovil.get(someMajorDamage.parte.nombre_json) || { x: 0, y: 0 };
            damagesPoints.push(new DamagePoint(coords.x, coords.y, someMajorDamage.danio.severidad.nombre, damagesOfGroupPart.length))
        }
    }

    return damagesPoints;
}

export function buildDamagesPointsFromBarbara(damages: any): DamagePoint[] {
    const damagesPoints: DamagePoint[] = [];

    for (let partWithDamage of Object.keys(damages)) {
        const damage = damages[partWithDamage]
        if (damage) {
            const coords = PartCoordsAutomovil.get(partWithDamage) || { x: 0, y: 0 };
            damagesPoints.push(new DamagePoint(coords.x, coords.y, getBarbaraSeverityBySeverityId(DamagesConfigByCode.get(damage)?.severidad)))
        }
    }

    return damagesPoints;
}