import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SolicitudInspeccionDTO } from '../services/DTOs/solicitudInspeccionDTO';
import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';
import { InspeccionStorageService } from '../services/inspeccion-storage.service';
import { Route } from '../helpers/Routes.enum';
import { InspeccionService } from '../services/inspeccion.service';
import { browserRefresh } from 'src/app/app.component';
import { StepsDigitalService } from '../services/stepsDigital.service';

@Component({
  selector: 'app-verificacion-automotor-zurich',
  templateUrl: './verificacion-automotor-zurich.component.html',
  styleUrls: ['./verificacion-automotor-zurich.component.css']
})
export class VerificacionAutomotorZurichComponent implements OnInit {

  inspeccionDTO!: InspeccionDTO;
  receivedObject!:string;
  paramsUrl: any = {};

  solicitud!: SolicitudInspeccionDTO;
  constructor(
    private router: Router, 
    private dataService: InspeccionStorageService,
    private stepsDigitalService:StepsDigitalService) { }

  ngOnInit(): void {
    if(browserRefresh){
      this.router.navigate([Route.ZURICH_STARTING_POINT], { queryParams:
        {
          _userId: localStorage.getItem('_userId'),
          idRepo: localStorage.getItem('idRepo'),
          key: localStorage.getItem('key'),
          aseguradora: localStorage.getItem('aseguradora'),
          _token: localStorage.getItem('_token'),
          a: localStorage.getItem('a')
        }
      });
    }
    else {
      this.getInspectionObject();
    }
  }

  getInspectionObject() {
    this.dataService.source$.subscribe((object: string) => this.receivedObject = object);
    this.inspeccionDTO = JSON.parse(`${this.receivedObject}`);
    console.log("Verificación automotor: ", this.inspeccionDTO);
  }

  sendInspectionObject() {
    let inspeccion = JSON.stringify(this.inspeccionDTO);
    this.dataService.changeSource(inspeccion);
  }

  nextPage() {
    this.sendInspectionObject();
    //const tipo_vehiculo_description = this.inspeccionDTO.inspeccion.vehiculo.tipo_descripcion;
    this.stepsDigitalService.completeStep(0);
    this.router.navigate([Route.ZURICH_DETAILS], { queryParams:
        {
          _token: this.paramsUrl._token,
          _userId: this.paramsUrl._userId,
          aseguradora: this.paramsUrl.aseguradora,
          id: this.paramsUrl.id,
          key: this.paramsUrl.key
        }
      });

    // if(this.inspeccionService.IsNotVehicle(tipo_vehiculo_description)){
    //   this.router.navigate([Route.ZURICH_PHOTOS], { queryParams:
    //     {
    //       _token: this.paramsUrl._token,
    //       _userId: this.paramsUrl._userId,
    //       aseguradora: this.paramsUrl.aseguradora,
    //       id: this.paramsUrl.id,
    //       key: this.paramsUrl.key
    //     }
    //   });
    // }
    // else{
    //   this.router.navigate([Route.ZURICH_DETAILS], { queryParams:
    //     {
    //       _token: this.paramsUrl._token,
    //       _userId: this.paramsUrl._userId,
    //       aseguradora: this.paramsUrl.aseguradora,
    //       id: this.paramsUrl.id,
    //       key: this.paramsUrl.key
    //     }
    //   });
    // }
  }
}
