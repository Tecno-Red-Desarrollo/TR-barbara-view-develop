import { Injectable } from "@angular/core";

@Injectable()
export class UserInspectorService {

    asegurado: boolean = false;

    constructor() { }

    isAsegurado() {
        return this.asegurado;
    }

    setInspector(config: { inspector?: any, channel: any, aseParam: any }) {
        if (config.inspector) {
            switch (config.inspector) {
                case 'asegurado':
                    this.asegurado = true;
                    break;
                default:
                    this.asegurado = false;
            }
        } else {
            this.asegurado = config.aseParam && config.aseParam != '0' ? true : config.channel && config.channel == 4 ? true : false;
        }
        return this.asegurado;
    }
}
