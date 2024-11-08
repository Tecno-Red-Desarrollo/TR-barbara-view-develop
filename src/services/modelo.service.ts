import { Inject, Injectable } from '@angular/core';
// import { Response} from "@angular/http";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Modelo } from 'src/models/modelo';

@Injectable()
export class ModeloService {
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

  public getModelos(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'modeloAutomotor/all';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }


  public deleteModelo(data: Modelo) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'modeloAutomotor/delete';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updateModelo(data: Modelo) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'modeloAutomotor/update';
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
