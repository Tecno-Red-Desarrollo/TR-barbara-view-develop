import { Inject, Injectable } from '@angular/core';
// import { Response} from "@angular/http";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Repositorio } from 'src/models/repositorio';

@Injectable()
export class RepositorioService {
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
    let url = environment.apiUrl + 'estado/all';
    return this._http.post<any>(url, { _userId: this.userId, repositorio: true }, this.setHeaderOptions());
  }

  public getRepositorio(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'repositorio/all';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public getRepositorioReport(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'repositorio/descargarReporte';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public getRepositorioById(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'repositorio/getById/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public anularSolicitud(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'repositorio/anular';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public enviarLinkGestionador(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    this.token = String(localStorage.getItem("token"));
    data._userId = this.userId;
    data._token = this.token;
    let url = environment.apiUrl + 'repositorio/enviarLink';
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
