import { Inject, Injectable } from '@angular/core';
// import { Response} from "@angular/http";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { TipoVehiculo } from 'src/models/tipo-vehiculo';

@Injectable()
export class TipoVehiculoService {
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

  public getTiposVehiculo(data: any) {
    this.userId = Number(localStorage.getItem("userId"));
    data._userId = this.userId;
    let url = environment.apiUrl + 'tipoVehiculo/all';
    return this._http.post<any>(url, data, this.setHeaderOptions());
  }


  public deleteTipoVehiculo(data: TipoVehiculo) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'tipoVehiculo/delete';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public updateTipoVehiculo(data: TipoVehiculo) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'tipoVechiculo/update';
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
