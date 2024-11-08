import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable()
export class InspeccionStorageService {

  protected _source$ = new BehaviorSubject('');

  public get source$(){
    return this._source$.asObservable()
  }

  changeSource(object: string){
    this._source$.next(object)
  }
}
