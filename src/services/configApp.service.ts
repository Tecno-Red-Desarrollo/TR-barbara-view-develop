import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigApp } from 'src/models/aseguradoras/config-app';
import { environment } from '../environments/environment';

@Injectable()
export class ConfigAppService {
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

  public getConfigApp() {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'configApp2/all';
    return this._http.post<any>(url, {_userId: this.userId} , this.setHeaderOptions());
  }

  public getDetailById(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'configApp2/getById/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public updateConfigApp(data: ConfigApp) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'configApp2/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public addConfigApp(data: ConfigApp) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'configApp2/create';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public deleteConfigApp(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'configApp2/delete/' + id;
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
