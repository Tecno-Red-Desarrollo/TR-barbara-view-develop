import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
declare var geoPosition: any;

@Injectable()
export class LocationService {

    gpsActive = false;
    permissionGranted = false;
    coords: any = { latitude: 0, longitude: 0, accuracy: 0 }

    protected _permissionGranted$ = new BehaviorSubject(false);


    constructor() {
        geoPosition.init();
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {

            result.addEventListener('change', () => {
                console.log(result.state)
                this.changePermission(result.state);
            });


        });
    }

    public get permissionGranted$() {
        return this._permissionGranted$.asObservable()
    }

    changePermission(permission: string) {

        if (permission === 'granted') {
            this.gpsActive = true;
            this.permissionGranted = true;
        } else {
            this.gpsActive = false;
            this.permissionGranted = false;
        }

        this._permissionGranted$.next(this.permissionGranted);
    }

    isGpsActive() {
        return this.gpsActive;
    }

    isPermissionGranted() {
        return this.permissionGranted;
    }

    getPosition(): Promise<any> {

        let sThis = this;
        return new Promise((resolve, reject) => {

            geoPosition.getCurrentPosition((p: any) => {

                console.log(p)
                sThis.coords.latitude = p.coords.latitude + " " + p.coords.accuracy;
                sThis.coords.longitude = p.coords.longitude + " " + p.coords.accuracy;
                sThis.coords.accuracy = p.coords.accuracy;
                resolve(sThis.coords);

            }, (err: any) => {

                console.log(err);
                reject(err.code);

            }, { enableHighAccuracy: true });

        })


    }


}
