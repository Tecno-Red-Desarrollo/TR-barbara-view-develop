export function isInspectionWithDamages(inspection: any) {
    let hasDamages = false;

    let isTire = (part: any) => part.indexOf('rueda') != -1;
    let isOptic = (part: any) => part.indexOf('optica') != -1;
    let parts = Object.keys(inspection.Danios).filter((p: any) => !isTire(p) && !isOptic(p)).map(k => ({ part: k, damage: inspection.Danios[k] }));

    if (parts.some((d) => d.damage)) {
        hasDamages = true;
    }

    parts = Object.keys(inspection.Danios).filter((p: any) => isOptic(p)).map(k => ({ part: k, damage: inspection.Danios[k] }));

    const isOpticWithDamage = (optic: any) => {
        if (!optic) return false;
        let hasDamage = false;
        let lights = String(optic).split(':');
        if (lights.length > 3) {
            for (let i = 0; i < 4; i++) if (lights[i]) hasDamage = true;
        }
        return hasDamage
    }

    if (parts.some(optic => isOpticWithDamage(optic.damage))) {
        hasDamages = true;
    }

    return hasDamages;
}

export function checkInspectionAndRequestAreSames(inspection: any, key: string) {
    if (!inspection.Solicitud) return true;
    return inspection.Solicitud && inspection[key] === inspection.Solicitud[key]
}

export function openPhotoByFileName() {

}