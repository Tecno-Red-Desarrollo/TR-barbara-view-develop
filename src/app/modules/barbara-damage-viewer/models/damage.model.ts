import { Part } from "./part.model";

export class Damage {

    type: string;
    location: Part;
    severity: number;

    constructor(type: string, location: Part, severity: number) {
        this.type = type;
        this.location = location;
        this.severity = severity;
    }

}