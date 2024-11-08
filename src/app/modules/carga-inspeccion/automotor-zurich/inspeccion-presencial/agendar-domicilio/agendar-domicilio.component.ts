import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { WindowRef } from 'src/services/window.service';
import { environment } from '../../../../../../environments/environment';
import { StepsPresencialService } from '../../services/stepsPresencial.service';

@Component({
  selector: 'app-agendar-domicilio',
  templateUrl: './agendar-domicilio.component.html',
  styleUrls: ['./agendar-domicilio.component.css']
})
export class AgendarDomicilioComponent implements OnInit {

  queryParams: any;
  url: String = '';
  constructor(private winRef: WindowRef, private activatedRoute: ActivatedRoute, public stepsService: StepsPresencialService, private router: Router) {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.queryParams = params;

        let datos: any = {};
        datos.dominio = this.queryParams.dominio;
        datos.marca = this.queryParams.marca;
        datos.modelo = this.queryParams.modelo;
        datos.anio = Number(this.queryParams.anio);
        datos.chasis = this.queryParams.chasis;
        datos.motor = this.queryParams.motor;
        datos.nombre = this.queryParams.nombre;
        datos.apellido = this.queryParams.apellido;
        datos.cobertura = this.queryParams.cobertura;
        datos.email = this.queryParams.email;
        datos.clugar = this.queryParams.cLugar;
        datos.idRepo = Number(this.queryParams.idRepo);
        datos.aseguradora = Number(this.queryParams.aseguradora);
        let json = JSON.stringify(datos);

        this.url = `https://tst.tecno-red.com.ar/api/consultaCalendario?renderCB=whatsapp/calendario-angular&idCiudad=${Number(this.queryParams.id_c)}&prov=${Number(this.queryParams.provincia)}&loc=${Number(this.queryParams.localidad)}&cb=${environment.apiUrl}ws/agendaBack&d=${environment.domain}&datos=${json}`;

        this.winRef.nativeWindow.cierraCaso = function (p: any) {
          let userId = localStorage.getItem('_userId');
          location.replace(`/api/ws/finAgendar?p=${p}&cierre=d&idRepo=${datos.idRepo}&aseguradora=${datos.aseguradora}&_userId=${userId}`);
        }

      });
  }

  ngOnInit(): void {
    if (browserRefresh) {
      this.router.navigate(['/carga-inspeccion/automotor-zurich/inicio'], {
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
  }


}
