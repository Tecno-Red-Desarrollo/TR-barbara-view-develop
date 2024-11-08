import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { InspeccionDTO } from 'src/app/modules/carga-inspeccion/automotor-zurich/services/DTOs/inspeccionDTO';
import { InspeccionStorageService } from '../services/inspeccion-storage.service';
import { SolicitudInspeccionDTO } from '../services/DTOs/solicitudInspeccionDTO';
import { InspeccionService } from '../services/inspeccion.service';

import { ChannelHelper } from '../helpers/ChannelHelpers';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserInspectorService } from '../services/user-inspector.service';
import { Channel } from '../helpers/Channels.enum';

@Component({
  selector: 'app-inicio-automotor-zurich',
  templateUrl: './inicio-automotor-zurich.component.html',
  styleUrls: ['./inicio-automotor-zurich.component.css', '../css/zurich-style.css']
})

export class InicioAutomotorZurichComponent implements OnInit {
  spinner: boolean = false;
  paramsUrl: any = {};

  inspeccionDTO!: InspeccionDTO;
  solicitud!: SolicitudInspeccionDTO;
  dominio: string = "";
  deviceInfo: any;
  enableDesktop!: boolean;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private inspeccionService: InspeccionService,
    private dataService: InspeccionStorageService,
    private deviceService: DeviceDetectorService,
    private userInspectorService: UserInspectorService) {
  }

  ngOnInit(): void {
    //this.inspeccionService.demoLogin();
    this.consultSolicitud();
    this.getParams();
    console.log("Inicio");
  }

  private consultSolicitud(): InspeccionDTO {
    this.activeRoute.queryParams.subscribe(params => {
      this.paramsUrl = params;
      this.inspeccionService.getSolicitudInspeccion(params).then((res) => {
        this.inspeccionDTO = res;
        this.dominio = this.inspeccionDTO.inspeccion.vehiculo.dominio;
        this.enableDesktop = this.inspeccionDTO.permiteDesktop;
        this.userInspectorService.setInspector({ channel:this.inspeccionDTO.canal, aseParam: this.paramsUrl.a });
        this.getDeviceInfo();
      });
    });
    return this.inspeccionDTO;
  }

  sendInspectionObject() {
    let _inspeccion = JSON.stringify(this.inspeccionDTO);
    this.dataService.changeSource(_inspeccion);
  }

  getParams() {
    this.activeRoute.queryParams
      .subscribe(params => {
        this.paramsUrl = params;
      });
    let params = this.paramsUrl;
    this.saveParametersInMemory(params._userId, params.idRepo, params.key, params.aseguradora, params._token, params.a);
  }

  goToPageInspeccionDigital() {
    this.sendInspectionObject();
    /* Todo esto refactorizarlo una vez que esté funcionando */
    const channel = this.inspeccionDTO.canal;
    const esAsegurado = this.userInspectorService.isAsegurado();
    const route = ChannelHelper.setRoute(channel, esAsegurado).toString();
    

    this.router.navigate([route], {
      queryParams:
      {
        _token: this.paramsUrl._token,
        _userId: this.paramsUrl._userId,
        aseguradora: this.paramsUrl.aseguradora,
        idRepo: this.paramsUrl.idRepo,
        key: this.paramsUrl.key,
        noEdita: 1 //Este "booleano" indica si es, editable o no, los campos como Marca, Modelo, Dominio.
      }
    });
  }

  goToPageInspeccionPresencial() {
    this.sendInspectionObject();
    this.router.navigate(['/carga-inspeccion/automotor-zurich/presencial/confirmar-ubicacion'], {
      queryParams: {
        _token: this.paramsUrl._token,
        _userId: this.paramsUrl._userId,
        aseguradora: this.paramsUrl.aseguradora,
        idRepo: this.paramsUrl.idRepo,
        key: this.paramsUrl.key,
        noEdita: 1 //Este "booleano" indica si es, editable o no, los campos como Marca, Modelo, Dominio.
      }
    });
  }

  //Función necesaria en caso que el usuario quiera refrescar la página en la que se quedó
  //y redireccionar al principio de la inspección digital.
  saveParametersInMemory(userId: string, idRepo: string, key: string, aseguradora: string, token: string, a: string): void {
    localStorage.setItem('_userId', userId);
    localStorage.setItem('idRepo', idRepo);
    localStorage.setItem('key', key);
    localStorage.setItem('aseguradora', aseguradora);
    localStorage.setItem('_token', token);
    localStorage.setItem('a', a);
  }

  getDeviceInfo() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    if ((!this.enableDesktop && this.userInspectorService.isAsegurado()) && isDesktopDevice) {
      this.router.navigate(['carga-inspeccion/error'], {
        queryParams:
        {
          statusText: "Error al abrir navegador",
          message: "El acceso solo está permitido desde un teléfono móvil"
        }
      });
    }
  }
}
