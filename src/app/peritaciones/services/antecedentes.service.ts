import { Inject, Injectable } from '@angular/core';
// import { Response} from "@angular/http";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AntecedentesService {
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

    public findHistoryByPLate(plate: string) {
        this.userId = Number(localStorage.getItem("userId"));
        let url = environment.apiUrl + 'antecedentes/findByPlate';
        return this._http.post<any>(url, { _userId: this.userId, dominio: plate }, this.setHeaderOptions());
    }



}
