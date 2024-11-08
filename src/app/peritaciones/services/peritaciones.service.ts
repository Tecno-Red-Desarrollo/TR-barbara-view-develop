import { Inject, Injectable } from '@angular/core';
// import { Response} from "@angular/http";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PeritacionesService {
    userId = -1;
    token = '';

    constructor(private _http: HttpClient) {

    }


    private setHeaderOptions() {
        this.token = String(localStorage.getItem("token"));
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.token
            })
        };
    }

    public getEstados() {
        this.userId = Number(localStorage.getItem("userId"));
        let url = environment.apiUrl + 'peritaciones/estado/all';
        return this._http.post<any>(url, { _userId: this.userId, repositorio: true }, this.setHeaderOptions());
    }

    public getPeritaciones(data: any) {
        this.userId = Number(localStorage.getItem("userId"));
        data._userId = this.userId;
        let url = environment.apiUrl + 'peritaciones/all';
        return this._http.post<any>(url, data, this.setHeaderOptions());
    }

    public getPeritacionById(id: string) {
        let userId = Number(localStorage.getItem("userId"));
        let url = environment.apiUrl + 'peritaciones/getById/' + id;
        return this._http.post<any>(url, { _userId: userId }, this.setHeaderOptions());
    }

    public getPeritacionesReport(data: any) {
        this.userId = Number(localStorage.getItem("userId"));
        data._userId = this.userId;
        let url = environment.apiUrl + 'peritaciones/descargarReporte';
        return this._http.post<any>(url, data, this.setHeaderOptions());
    }

    public addNewApprasial(newApprasial: any) {
        this.userId = Number(localStorage.getItem("userId"));
        let url = environment.apiUrl + 'peritaciones/add/';
        return this._http.post<any>(url, { _userId: this.userId, ...newApprasial }, this.setHeaderOptions());
    }

    public anularSolicitud(data: any) {
        this.userId = Number(localStorage.getItem("userId"));
        data._userId = this.userId;
        let url = environment.apiUrl + 'peritaciones/anular';
        return this._http.post<any>(url, data, this.setHeaderOptions());
    }

    public sendAccessLink(data: any) {
        this.userId = Number(localStorage.getItem("userId"));
        this.token = String(localStorage.getItem("token"));
        data._userId = this.userId;
        data._token = this.token;
        let url = environment.apiUrl + 'peritaciones/enviarLink';
        return this._http.post<any>(url, data, this.setHeaderOptions());
    }

    public finishApprasial(data: any) {
        this.userId = Number(localStorage.getItem("userId"));
        data._userId = this.userId;
        let url = environment.apiUrl + 'peritaciones/finish';
        return this._http.post<any>(url, data, this.setHeaderOptions());
    }

    public sendApprasialToReview(data: any) {
        this.userId = Number(localStorage.getItem("userId"));
        data._userId = this.userId;
        let url = environment.apiUrl + 'peritaciones/review';
        return this._http.post<any>(url, data, this.setHeaderOptions());
    }


    private toJSON(object: any) {
        let extra: any = {};
        let classProperties = Object.getOwnPropertyNames(object);
        for (let i = 0; i < classProperties.length; i++) {

            extra[classProperties[i]] = object[classProperties[i]];

        }
        return Object.assign({
            _userId: this.userId

        }, extra)
    }


}
