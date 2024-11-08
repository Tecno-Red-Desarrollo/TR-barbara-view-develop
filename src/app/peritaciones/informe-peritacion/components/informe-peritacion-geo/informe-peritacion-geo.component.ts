import { Component, Input } from '@angular/core';
import { GoogleMapsLoaderService } from 'src/app/inspecciones/informe-inspeccion/GoogleMapsLoader.service';

@Component({
  selector: 'informe-peritacion-geo',
  templateUrl: './informe-peritacion-geo.component.html',
  styleUrls: ['./informe-peritacion-geo.component.css']
})
export class InformePeritacionGeoComponent {
  mapLoaded = false;
  zoom = 12;
  center: google.maps.LatLngLiteral;
  marker: any;


  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  @Input('latitud') latitudInspeccion: any;
  @Input('longitud') longitudInspeccion: any;

  constructor(private googleMapsLoaderService: GoogleMapsLoaderService) { }

  ngOnInit(): void {
    this.center = { lat: Number(String(this.latitudInspeccion).split(' ')[0]), lng: Number(String(this.longitudInspeccion).split(' ')[0]) };

    this.marker = {
      position: this.center,
      options: { draggable: false }
    };
    this.googleMapsLoaderService.loadGoogleMapsScript().then(() => {
      this.mapLoaded = true;
    }).catch((error) => {
    });
  }
}
