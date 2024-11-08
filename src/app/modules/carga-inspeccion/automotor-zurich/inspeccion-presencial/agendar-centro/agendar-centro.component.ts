import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { WindowRef } from '../../../../../../services/window.service';
import { StepsPresencialService } from '../../services/stepsPresencial.service';
declare var _: any;
declare var swal: any;
@Component({
  selector: 'app-agendar-centro',
  templateUrl: './agendar-centro.component.html',
  styleUrls: ['./agendar-centro.component.css']
})
export class AgendarCentroComponent implements OnInit {

  queryParams: any;

  constructor(private winRef: WindowRef, public stepsService: StepsPresencialService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.queryParams = params;

        let idRepo = Number(this.queryParams.idRepo);

        let exitFullscreen = () => {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (this.winRef.nativeWindow.document.mozCancelFullScreen) {
            this.winRef.nativeWindow.document.mozCancelFullScreen();
          } else if (this.winRef.nativeWindow.document.webkitExitFullscreen) {
            this.winRef.nativeWindow.document.webkitExitFullscreen();
          }
        }

        this.winRef.nativeWindow._clickTaller = function (id: any, talleres: any, aseguradora = 33, userId: any) {
          userId = localStorage.getItem('_userId');
          let res = _.filter(talleres, { "id": id });
          exitFullscreen();
          swal.fire({
            title: "INSPECCION EN CENTROS",
            html: "Concurrirá al Centro de Inspección: " + res[0].nombre + "<br><br><b>Dirección:</b> " + res[0].info + "<br><b>Horarios:</b> " + res[0].horario,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
          }).then(function (seleccion: any) {
            if (seleccion.value) {
              location.replace("/api/ws/finAgendar?p=" + JSON.stringify(res) + `&cierre=t&idRepo=${idRepo}&aseguradora=${aseguradora}&_userId=${userId}`);
            }
          });
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
