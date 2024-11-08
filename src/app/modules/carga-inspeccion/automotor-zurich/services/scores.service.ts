import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ScoresService {

  constructor(private _http: HttpClient) {}

  private getToken() : string {
    let token = String(sessionStorage.getItem("_token"));
    return token;
  }

  private getUserId() : Number {
    let userId = Number(localStorage.getItem("_userId"));
    return userId;
  }

  private setHeaderOptions() {
    let token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  public save(data: any) {
    let url = environment.apiUrl + 'score/save';
    return this._http.post<any>(url, this.toJSON(data));
  }

  private toJSON(object: any) {
    let extra: any = {};
    let classProperties = Object.getOwnPropertyNames(object);
    for (let i = 0; i < classProperties.length; i++) {
      extra[classProperties[i]] = object[classProperties[i]];
    }
    return Object.assign({ _userId: this.getUserId()}, extra)
  }
}
