import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '../helpers/Routes.enum';
import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';
import { InspeccionStorageService } from '../services/inspeccion-storage.service';

@Component({
  selector: 'app-inicio-productor-zurich',
  templateUrl: './inicio-productor-zurich.component.html',
  styleUrls: ['./inicio-productor-zurich.component.css']
})
export class InicioProductorZurichComponent implements OnInit {

  paramsUrl: any = {};
  enableSendMail!: boolean;
  inspeccionDTO!: InspeccionDTO;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private dataService: InspeccionStorageService) { }

  ngOnInit(): void {
    this.getInspectionObject();
    this.getParams();
    console.log("Inicio Productor", this.inspeccionDTO);
  }

  redirectToSendMail(){
    this.router.navigate([Route.ZURICH_REENVIO_ASEGURADO], { queryParams:
      {
        email: this.inspeccionDTO.titularEmail,
        celular: this.inspeccionDTO.titularTelefono
      }
    });
  }

  redirectToCargaInspeccion(){
    this.router.navigate([Route.ZURICH_CONSIDERATIONS], { queryParams:
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

  getInspectionObject() {
    this.dataService.source$.subscribe((object: string) => {
      this.inspeccionDTO = JSON.parse(object);
    });
  }

  getParams() {
    this.activeRoute.queryParams
    .subscribe(params => {
      this.paramsUrl = params;
    });
  }
}
