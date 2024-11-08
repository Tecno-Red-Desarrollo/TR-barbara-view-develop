import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs";
import { Location } from "@angular/common";


@Injectable()
export class StepsDigitalService {
  constructor(private location: Location) { }

  protected _source$ = new BehaviorSubject(-1);

  public get source$() {
    return this._source$.asObservable()
  }

  completeStep(index: number) {
    this._source$.next(index)
  }


  navBack() {
    this.location.back();
  }
  
}
