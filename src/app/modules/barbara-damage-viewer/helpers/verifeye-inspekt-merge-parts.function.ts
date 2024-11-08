import { InspektParts } from "../config/inspekt-parts.enum";
import { Parts } from "../config/parts.enum";
import { inspektToVerifeyeDamagesMap, inspektToVerifeyePartsMap } from '../config/verifeye.maps';
import { partsGroupsMap } from "../config/verifeye.maps";
import { PartsGroups, PartsSubGroups } from "../config/parts-groups";
import { InspektDamages } from "../config/inspekt-damages.enum";
import { Damages } from "../config/damages.enum";

/**
 * Recibe un nombre de parte de Verifeye y devuelve el correspondiente de Verifeye
 * @param inspektPart 
 * @returns 
 */
export function inspektToVerifeyePartName(inspektPart: InspektParts): Parts | null {

    return inspektToVerifeyePartsMap.get(inspektPart) || null;
}

export function getPartGroups(part: Parts) {

    return partsGroupsMap.get(part);
}

export function getPartGroup(part: Parts): PartsGroups | undefined {

    const groups = partsGroupsMap.get(part);
    return groups?.part_group || undefined;
}

export function getPartSubGroup(part: Parts): PartsSubGroups | undefined {

    const groups = partsGroupsMap.get(part);
    return groups?.part_sub_group || undefined;
}

export function getVerifeyeDamage(damage: InspektDamages): Damages | undefined {

    return inspektToVerifeyeDamagesMap.get(damage);
}
