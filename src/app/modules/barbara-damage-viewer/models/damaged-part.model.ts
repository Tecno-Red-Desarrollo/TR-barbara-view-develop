import { Severity } from "../../damage-viewer/config/severity.enum";
import { Damage } from "./damage.model";
import { Part } from "./part.model";

export class DamagedPart {

    part: Part;
    listOfDamages: Array<Damage>;
    damagedPartSeverity: Severity;

    constructor(part: Part, listOfDamages: Array<Damage>, damagedPartSeverity: Severity) {
        this.part = part;
        this.listOfDamages = listOfDamages;
        this.damagedPartSeverity = damagedPartSeverity;
    }
    
}