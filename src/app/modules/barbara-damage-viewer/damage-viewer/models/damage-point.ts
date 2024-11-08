import { Severity } from "../config/severity.enum";

export class DamagePoint {
    x: number;
    y: number;
    severity: string;
    damagesCount: number;

    constructor(coord_x: number, coord_y: number, severity: Severity, damagesCount?: number) {
        this.x = coord_x || 0;
        this.y = coord_y || 0;
        this.severity = severity;
        this.damagesCount = damagesCount || 1;
    }
}