import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class DropdownService {
  userId = -1;
  token = '';

  constructor(private _http: HttpClient) { }

  private setHeaderOptions() {
    this.token = String(localStorage.getItem("token"));
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  public getAseguradoras() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'dropdown/aseguradora';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public getLugares() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'dropdown/lugar';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public getProvincias() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'dropdown/provincia';
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public getCiudades(id?: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'dropdown/ciudad/'+ id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public getUsuarios() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'dropdown/usuario';
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
