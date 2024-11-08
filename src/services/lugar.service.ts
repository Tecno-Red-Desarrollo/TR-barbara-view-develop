import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from 'src/models/lugar';
import { environment } from '../environments/environment';

@Injectable()
export class LugarService {
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

  public getLugares(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'lugar/all';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public getDetailById(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'lugar/getById/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }
  
  public addLugar(data: Lugar) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'lugar/create';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updateLugar(data: Lugar) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'lugar/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
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