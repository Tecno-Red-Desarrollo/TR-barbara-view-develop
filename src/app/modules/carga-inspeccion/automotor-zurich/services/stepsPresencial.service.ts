import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs";
import { Location } from "@angular/common";


@Injectable()
export class StepsPresencialService {
  constructor(private location: Location) { }

  protected _source$ = new BehaviorSubject('');

  public get source$() {
    return this._source$.asObservable()
  }

  changeStep(object: string) {
    this._source$.next(object)
  }


  navBack() {
    this.location.back();
  }
  
}
