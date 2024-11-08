import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable()
export class ImageParamsStorageService {

  protected _source$ = new BehaviorSubject(['']);

  public get source$(){
    return this._source$.asObservable()
  }

  changeSource(data: string[]) {
    this._source$.next(data)
  }
}
