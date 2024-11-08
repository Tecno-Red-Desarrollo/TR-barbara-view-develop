import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Taller } from 'src/models/taller';

@Injectable()
export class TallerService {
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

  public getTalleres(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'taller/all';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }

  public getDetailById(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'taller/getById/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }

  public addTaller(data: Taller) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'taller/create';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updateTaller(data: Taller) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'taller/update';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public deleteTaller(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'taller/delete/' + id;
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
