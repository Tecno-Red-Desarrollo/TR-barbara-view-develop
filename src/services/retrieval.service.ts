import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from 'src/models/lugar';
import { environment } from '../environments/environment';

@Injectable()
export class RetrievalService {
  apiKey = '111111111' ;

  constructor(private _http: HttpClient) { }

  private setHeaderOptions() {
    return {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": '*',
        "Authorization": 'X-API-KEY '+ this.apiKey ,
      })
    };
  }

  public scan(file: File) {
    //ARREGLAR ESE HARDCODEO DESPUÉS
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    //return this._http.post("/apiOCR/CedulaRetrieval", formData, this.setHeaderOptions());
    return this._http.post("https://192.168.100.190:5001/CedulaRetrieval", formData, this.setHeaderOptions());
  }
}
