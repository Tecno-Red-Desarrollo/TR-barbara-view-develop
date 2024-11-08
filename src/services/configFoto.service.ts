import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ConfigFotoService {
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

  public getByAseguradoraId(id: number) {
    this.userId = Number(localStorage.getItem("userId"));
    let url = environment.apiUrl + 'configfotos/getByAseguradoraId/' + id;
    return this._http.post<any>(url, { _userId: this.userId }, this.setHeaderOptions());
  }
}
