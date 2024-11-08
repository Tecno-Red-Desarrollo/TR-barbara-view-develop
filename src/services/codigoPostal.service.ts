import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CodigoPostal } from 'src/models/codigo-postal';

@Injectable()
export class CodigoPostalService {
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

  public getPostalCodes(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'codigopostal/all';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public getDetailById(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'codigopostal/getById/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public addPostalCode(data: CodigoPostal) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'codigopostal/create';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updatePostalCode(data: CodigoPostal) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'codigopostal/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public deletePostalCode(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'codigopostal/delete/' + id;
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