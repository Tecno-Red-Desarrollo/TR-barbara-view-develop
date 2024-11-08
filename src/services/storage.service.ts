import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
declare var swal: any;

@Injectable({ providedIn: 'root' })
export class StorageService {

    user: any;

    constructor() { }

    getUserId() {
        return Number(localStorage.getItem("userId"));
    }
    getToken() {
        return String(localStorage.getItem("token"));
    }

    setUser(u: Usuario) {
        this.user = u;
    }

    isUserWithPrivileges() {
        return [1027, 49, 104, 105, 102, 7446, 6268].some(uid => uid === this.getUserId())
    }

    getAseguradoras() {
        let aseguradoras: any = [];
        try {
            let _aseguradoras = String(localStorage.getItem("aseguradoras")).split('|');
            _aseguradoras = _aseguradoras.filter(a => (a));
            aseguradoras = _aseguradoras.map(a => Number(a));
        } catch (e) {

        }
        return aseguradoras;
    };

    getRol() {
        return 1
    }

}
