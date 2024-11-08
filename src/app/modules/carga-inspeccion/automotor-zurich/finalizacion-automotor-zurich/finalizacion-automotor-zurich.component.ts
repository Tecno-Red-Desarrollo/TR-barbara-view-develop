import { Component, OnInit } from '@angular/core';
import { InspeccionStorageService } from '../services/inspeccion-storage.service';

import { Score } from 'src/models/score';
import { MessageService } from 'primeng/api';
import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';
import { ActivatedRoute } from '@angular/router';
import { ScoresService } from '../services/scores.service';
import { UserInspectorService } from '../services/user-inspector.service';

@Component({
  selector: 'app-finalizacion-automotor-zurich',
  templateUrl: './finalizacion-automotor-zurich.component.html',
  styleUrls: ['./finalizacion-automotor-zurich.component.css']
})
export class FinalizacionAutomotorZurichComponent implements OnInit {
  barbara_id!: number;
  inspeccionDTO!: InspeccionDTO;
  showSurvey: boolean = false;
  puntajeFacilidad: number = 0;
  puntajeRecomendacion: number = 0;
  filterBlur: string = '';

  constructor(private dataService: InspeccionStorageService,
    private messageService: MessageService,
    private activeRoute: ActivatedRoute,
    private scoresService: ScoresService,
    private userInspectorService:UserInspectorService) { }

  ngOnInit(): void {
    this.getInspectionObject();
    this.getBarbaraId();
    console.log("Final: ", this.inspeccionDTO);
  }

  private getInspectionObject = () => { this.dataService.source$.subscribe((object: string) => this.inspeccionDTO = JSON.parse(object)); }


  getBarbaraId() {
    this.activeRoute.queryParams
      .subscribe(params => {
        let paramsURL = params;
        this.barbara_id = +paramsURL['idBarbara'];
      });
  }

  showQualitySurvey = () => this.showSurvey = true;

  closeQualitySurvey = () => this.showSurvey = false;

  onChangeScore = (score: number, type: string) => type == "Facilidad" ? this.puntajeFacilidad = score : this.puntajeRecomendacion = score;

  finalizar() {
    this.appliedFilter();
    if (this.userInspectorService.isAsegurado()) {

      this.showQualitySurvey();

    } else {

      this.finishAndRedirect();

    }
  }

  appliedFilter = () => this.filterBlur = 'filter: blur(6px)';

  sendScore() {
    this.closeQualitySurvey();
    let score = new Score(this.barbara_id, this.puntajeFacilidad, this.puntajeRecomendacion);
    this.scoresService.save(score).subscribe({
      next: (res: any) => {
        this.finishAndRedirect();
      },
      error: (err: any) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });
  }

  finishAndRedirect() {
    this.messageService.add({ severity: 'success', summary: 'Gracias', detail: "Gracias por valorar esta experiencia!", life: 3000 });
    setTimeout(() => {
      window.location.href = 'https://www.zurich.com.ar/';
    }, 2000);
  }
}
