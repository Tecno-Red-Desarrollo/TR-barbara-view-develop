import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/services/storage.service';
declare var moment: any;

@Injectable()
export class PeritacionesHelper {

    constructor(private storageService: StorageService) { }

    isOutOfDate(fecha: any) {
        return moment(moment()).diff(fecha, 'days') > 7;
    }

    getEstadoColor(solicitud: any) {
        switch (solicitud.estado) {
            case 1:
                //solicitada
                let color = 'var(--blue-500)';
                if (this.isOutOfDate(solicitud.fecha)) color = 'var(--pink-600)'; // Vencida

                return color;
            case 2:
                //auditando
                return 'var(--yellow-500)';
            case 4:
                //finalizada
                return 'var(--green-500)';
            case 8:
                //cancelada
                return 'var(--pink-600)';
            case 10:
                //duplicada
                return 'var(--gray-400)';
            default:
                return 'var(--blue-500)';
        }
    }

    getEstadoIcon(estado: number) {
        switch (estado) {
            case 1:
                //solicitada
                return "pi pi-info-circle";
            case 4:
                //auditando
                return "pi pi-search";
            case 8:
                //cancelada
                return "pi pi-times";
            case 5:
                //finalizada
                return "pi pi-check";
            default:
                return "pi pi-info-circle";
        }
    }

    checkEmail(v: string) {

        function check(e: string) {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e);
        }

        let mails = v.split(';');
        for (let i = 0; i < mails.length; i++) {
            if (!check(mails[i])) return false;
        }

        return true;
    }
}