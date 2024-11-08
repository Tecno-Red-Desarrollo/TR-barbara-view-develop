import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Detalle } from '../helpers/Detalles.enum';
import { InspeccionStorageService } from '../services/inspeccion-storage.service';
import { Route } from '../helpers/Routes.enum';
import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';
import { SolicitudInspeccionDTO } from '../services/DTOs/solicitudInspeccionDTO';
import { DetalleVehiculo } from '../models/detalle-vehiculo';
import { AdditionalDetailsBL } from '../models/contracts/additional-detailsBL';

import { browserRefresh } from 'src/app/app.component';
import { MessageService } from 'primeng/api';
import { StepsDigitalService } from '../services/stepsDigital.service';

@Component({
  selector: 'app-detalles-automotor-zurich',
  templateUrl: './detalles-automotor-zurich.component.html',
  styleUrls: ['./detalles-automotor-zurich.component.css']
})

export class DetallesAutomotorZurichComponent implements OnInit {
  inspeccionDTO!: InspeccionDTO;
  detalle = Detalle; //para poder utilizar los valores del enum en el html
  receivedObject!: string;

  paramsUrl: any = {};
  detalles_adicionales: any = [];
  solicitud!: SolicitudInspeccionDTO;

  public browserRefresh!: boolean;

  toggleOptions = [{ label: 'SI', value: 'true' }, { label: 'NO', value: 'false' }];

  constructor(
    private router: Router, 
    private dataService: InspeccionStorageService, 
    private messageService: MessageService,
    private stepsDigitalService:StepsDigitalService) { }

  ngOnInit(): void {
    if (browserRefresh) {
      this.router.navigate([Route.ZURICH_STARTING_POINT], {
        queryParams:
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
      this.detalles_adicionales = AdditionalDetailsBL.SetDetailsByVehicleType(this.inspeccionDTO.tv, this.inspeccionDTO.inspeccion.vehiculo.detalles);
    }
  }

  getInspectionObject() {
    this.dataService.source$.subscribe((object: string) => this.receivedObject = object);
    this.inspeccionDTO = JSON.parse(`${this.receivedObject}`);
    console.log("Detalles automotor: ", this.inspeccionDTO);
  }

  onChangeDetails(e: any, description: string, index: number): void {
    let checkedValue = e.value === 'true' ? true : false;
    let checked = AdditionalDetailsBL.VerifySelectedValue(description, checkedValue);
    this.inspeccionDTO.inspeccion.vehiculo.detalles[index] = new DetalleVehiculo(description, checked);
  }

  sendInspectionObject(): void {
    let _inspeccion = JSON.stringify(this.inspeccionDTO);
    this.dataService.changeSource(_inspeccion);
  }

  nextPage(): void {
    if (AdditionalDetailsBL.VerifySelectedAllDetails(this.detalles_adicionales)) {
      this.sendInspectionObject();
      this.stepsDigitalService.completeStep(1);
      this.router.navigate([Route.ZURICH_PHOTOS], {
        queryParams:
        {
          _token: this.paramsUrl._token,
          _userId: this.paramsUrl._userId,
          aseguradora: this.paramsUrl.aseguradora,
          id: this.paramsUrl.id,
          key: this.paramsUrl.key
        }
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Advertencia', detail: '¡Atención! Tenés que indicar SI o NO en cada opción.' });
    }
  }
}
