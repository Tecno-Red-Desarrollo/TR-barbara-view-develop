import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspeccionesService {

  constructor(private _http: HttpClient) { }

  private setHeaderOptions() {
    let token = String(localStorage.getItem("token"));
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
  }

  getInspectionById(id: string) {
    let userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'inspeccion/getById/' + id;
    return this._http.post<any>(url, { _userId: userId }, this.setHeaderOptions());
  }

  getInspectionByPublicId(id: string) {
    let url = environment.apiUrl + 'inspeccion/getByPublicId/' + id;
    return this._http.post<any>(url, this.setHeaderOptions());
  }

}
