import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsLoaderService {

    constructor() { }

  isLoaded = false;

  showMap = false;

  toggleShowMapa() {
    this.showMap = !this.showMap;
  }

  loadGoogleMapsScript(): Promise<void> {

    return new Promise<any>((resolve, reject) => {
      if (!this.isLoaded) {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsApiKey;
        scriptElement.onload = () => {
          this.isLoaded = true;
          return resolve('GoogleMap Script cargado con éxito');
        };
        scriptElement.onerror = () => reject('Error al cargar script de maps');
        document.body.appendChild(scriptElement);
      } else {
        return resolve('El script ya ha sido cargado previamente')
      }

    });
  }


}
