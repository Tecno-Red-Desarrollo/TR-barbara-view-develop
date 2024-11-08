import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Aseguradora } from 'src/models/aseguradoras/aseguradora';

@Injectable()
export class AseguradoraService {
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

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return throwError(errMsg);
  }

  public getAseguradoras() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'aseguradora/all';
    return this._http.post<any>(url, {_userId: this.userId} , this.setHeaderOptions());
  }

  public getDetailById(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'aseguradora/getById/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public updateAseguradora(data: Aseguradora) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'aseguradora/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public addAseguradora(data: Aseguradora) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'aseguradora/create';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public deleteAseguradora(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'aseguradora/delete/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
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
