import { Inject, Injectable } from '@angular/core';
// import { Response} from "@angular/http";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Infoauto } from 'src/models/infoauto';
import { Repositorio } from 'src/models/repositorio';
import { Provincia } from 'src/models/provincia';
import { Estado } from 'src/models/estado';

@Injectable()
export class ApiService {
  userId = -1;
  token = '';

  constructor(private _http: HttpClient) {
  }


  private setHeaderOptions() {
    this.token = String(localStorage.getItem("token") || localStorage.getItem("_token"));
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return throwError(errMsg);
  }

  public getInfoAuto(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'infoauto/all';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public getModelosInfoAuto(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'modelosInfoAuto';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public getMarcas() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'marcasInfoAuto';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public deleteInfoAuto(data: Infoauto) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'infoauto/delete';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updateInfoAuto(data: Infoauto) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'infoauto/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  // INICIO Provincias
  public getProvincias() {
    this.userId = Number(localStorage.getItem("userId") || localStorage.getItem("_userId"));
    let url = environment.apiUrl + 'provincia/all';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public addProvincia(data: Provincia) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'provincia/create';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updateProvincia(data: Provincia) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'provincia/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public deleteProvincia(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'provincia/delete/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
    //return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  // FIN Provincias

  public getAseguradoras() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'aseguradora/all';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  // INICIO Estados
  public getEstados() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'estado/all';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public addEstado(data: Estado) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'estado/create';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updateEstado(data: Estado) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'estado/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public deleteEstado(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'estado/delete/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }
  // FIN Estadosf

  public getCanales() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'canal/all';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public getUsuarios() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'usuario/all';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }


  public comboLugares(data: any) {
    this.userId = Number(localStorage.getItem("userId") || localStorage.getItem("_userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'comboLugaresAngular';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public checkCobertura(data: any) {
    this.userId = Number(localStorage.getItem("userId") || localStorage.getItem("_userId"));
    data._userId = this.userId;
    let url = environment.agendaApiUrl + 'checkCobertura';
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

  private calcVER(data: any) {
    this.userId = Number(localStorage.getItem("userId") || localStorage.getItem("_userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'calculaVER';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

}
