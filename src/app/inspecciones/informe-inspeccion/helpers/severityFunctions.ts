import { Severity } from "src/app/modules/barbara-damage-viewer/damage-viewer/config/severity.enum";

export function getMajorSeverity(damages: any) {
    const severities = damages.map((d: any) => d.danio.severidad.id);
    return Math.max(...severities)
}

export function getSeverityColor(severity: number | string) {
    return new Map<string | number, string>([[1, 'leve'], [2, 'medio'], [3, 'severo'], ['leve', 'leve'], ['medio', 'medio'], ['severo', 'severo']]).get(severity) || 'info';
}

export function getBarbaraSeverityBySeverityId(severity: any) {
    return new Map([[1, Severity.LEVE], [2, Severity.MEDIO], [3, Severity.GRAVE]]).get(severity) || Severity.LEVE
}