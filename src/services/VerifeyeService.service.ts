import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VerifeyeService {
    constructor(private _http: HttpClient) { }

    private setHeaderOptions() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + environment.verifeyeApiToken
        })
    }

    getAnalysisById(id: number) {
        let userId = Number(localStorage.getItem("userId"));
        let url = environment.verifeyeApiUrl + 'analisis/customBrb/' + id;
        return this._http.get<any>(url, { headers: this.setHeaderOptions() });
    }

    getAnalyzedPhoto(id: number): Observable<Blob> {
        let userId = Number(localStorage.getItem("userId"));
        let url = environment.verifeyeApiUrl + 'api/getAnalyzedPhoto';
        return this._http.post(url, { id }, { headers: this.setHeaderOptions(), responseType: 'blob' });
    }

}
