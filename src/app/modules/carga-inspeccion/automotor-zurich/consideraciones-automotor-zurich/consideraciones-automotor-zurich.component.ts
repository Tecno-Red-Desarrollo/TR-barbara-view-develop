import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InspeccionStorageService } from '../services/inspeccion-storage.service';

import { SolicitudInspeccionDTO } from '../services/DTOs/solicitudInspeccionDTO';
import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';
import { TipoInspeccion } from '../models/tipo-inspeccion';
import { browserRefresh } from 'src/app/app.component';
import { Route } from '../helpers/Routes.enum';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserInspectorService } from '../services/user-inspector.service';

@Component({
  selector: 'app-consideraciones-automotor-zurich',
  templateUrl: './consideraciones-automotor-zurich.component.html',
  styleUrls: ['./consideraciones-automotor-zurich.component.css','../css/zurich-style.css']
})
export class ConsideracionesAutomotorZurichComponent implements OnInit {

  inspeccionDTO!: InspeccionDTO;
  paramsUrl: any = {};
  solicitud!: SolicitudInspeccionDTO;
  deviceInfo: any;
  enableDesktop!: boolean;

  public browserRefresh!: boolean;


  constructor(private router: Router,
    private dataService: InspeccionStorageService,
    private deviceService: DeviceDetectorService,
    private userInspectorService: UserInspectorService) { }

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
    }
    if (this.userInspectorService.isAsegurado()) {

      this.getDeviceInfo();

    }

  }

  getInspectionObject() {
    this.dataService.source$.subscribe((object: string) => {
      this.inspeccionDTO = JSON.parse(object);
      this.inspeccionDTO.inspeccion.tipo = new TipoInspeccion(1, 'Inspección Digital');
    });
  }

  sendInspectionObject() {
    let _inspeccion = JSON.stringify(this.inspeccionDTO);
    this.dataService.changeSource(_inspeccion);
  }

  getDeviceInfo() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    if (!this.enableDesktop && isDesktopDevice) {
      this.router.navigate(['carga-inspeccion/error'], {
        queryParams:
        {
          statusText: "Error al abrir navegador",
          message: "El acceso solo está permitido desde un teléfono móvil"
        }
      });
    }
  }

  nextPage() {
    this.sendInspectionObject();
    this.router.navigate([Route.ZURICH_CONFIRM_VEHICLE]);
  }
}
