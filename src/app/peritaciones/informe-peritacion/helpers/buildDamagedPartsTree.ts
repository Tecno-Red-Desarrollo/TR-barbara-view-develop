import { getMajorSeverity, getSeverityColor } from "./severityFunctions";
import { verGroupsWithParts } from "./verGroupsWithParts";

export function buildDamagedPartsTree(damageReport: any) {
    const verGroupsKeys: any[] = Object.keys(verGroupsWithParts);
    let treeGroupsTemp: any[] = [];

    console.log(damageReport)
    for (let verGroupKey of verGroupsKeys) {
        let verTempGroup: any = {
            key: verGroupKey,
            label: verGroupKey.charAt(0).toUpperCase() + verGroupKey.slice(1),
            children: [],
            type: 'grupo-ver'
        }
        if (damageReport[verGroupKey]) {

            for (let damage of damageReport[verGroupKey]) {
                let newDamageChildren = {
                    part: damage.panel,
                    damage: damage.danio,
                    key: `${damage.panel}-${damage.danio}`,
                    label: `${damage.panel} - ${damage.danio}`,
                    type: 'danio'
                }

                verTempGroup.children.push(newDamageChildren)
            }
            
        }
        if (verTempGroup.children.length > 0) {
            treeGroupsTemp.push(verTempGroup);
        }

    }

    return treeGroupsTemp;
}

export function buildDamagedPartsTreeFromVerifeyeDamages(damagesWithParts: any[]) {
    const verGroupsKeys: any[] = Object.keys(verGroupsWithParts);
    let treeGroupsTemp: any[] = [];

    let damagedPartsGroupsKeys: any = new Set(damagesWithParts.map(dwp => dwp.parte.nombre.nombre));

    let damagedPartGroups: any[] = [];

    for (let dpGroupKey of damagedPartsGroupsKeys) {
        const damages = damagesWithParts.filter(dwp => dwp.parte.nombre.nombre === dpGroupKey)
        const tempDpGroup: any = {
            damages,
            key: dpGroupKey.toLowerCase(),
            label: dpGroupKey,
            damages_count: damages.length,
            major_severity: getMajorSeverity(damages),
            major_severity_color: getSeverityColor(getMajorSeverity(damages)),
            children: damages.map(dwp => {
                return {
                    part: dwp.parte.nombre_json,
                    severity_color: getSeverityColor(dwp.danio.severidad.id),
                    damage: dwp,
                    key: `${dpGroupKey.toLowerCase()}-${dwp.parte.componente.nombre}`,
                    label: `${dwp.parte.componente.nombre} ${dwp.danio.nombre.toLowerCase()}`,
                    type: 'danio'
                }
            })
        };
        damagedPartGroups.push(tempDpGroup)
    }

    for (let verGroupKey of verGroupsKeys) {
        let verTempGroup: any = {
            key: verGroupKey,
            label: verGroupKey.charAt(0).toUpperCase() + verGroupKey.slice(1),
            children: [],
            type: 'grupo-ver'
        }
        for (let group of damagedPartGroups) {
            if (group.children && group.children.length > 0) {
                const found = verGroupsWithParts[verGroupKey].find((p: any) => p.nombre === group.children[0].part)
                if (found) verTempGroup.children.push(group);
            }
        }
        if (verTempGroup.children.length > 0) {
            verTempGroup.damages_count = verTempGroup.children.reduce((a: any, b: any) => a + b.damages_count, 0)
            verTempGroup.major_severity_color = getSeverityColor(getMajorSeverity(verTempGroup.children.map((c: any) => c.damages).flat(1)))
            treeGroupsTemp.push(verTempGroup);
        }
    }


    return treeGroupsTemp;
}

