import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SendMessagesService {

  constructor(private _http: HttpClient) {}

  private getToken() : string {
    let token = String(sessionStorage.getItem("token"));
    return token;
  }

  private getUserId() : Number {
    let userId = Number(sessionStorage.getItem("userId"));
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

  public sendMail(data: any) {
    let url = environment.apiUrl + 'sendMessage/mail';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public sendSMS(data: any) {
    let url = environment.apiUrl + 'sendMessage/sms';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
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
