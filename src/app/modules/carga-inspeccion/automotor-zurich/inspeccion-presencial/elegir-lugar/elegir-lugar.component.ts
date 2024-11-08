import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from 'src/app/app.component';
import { StepsPresencialService } from '../../services/stepsPresencial.service';

@Component({
  selector: 'app-elegir-lugar',
  templateUrl: './elegir-lugar.component.html',
  styleUrls: ['./elegir-lugar.component.css']
})
export class ElegirLugarComponent implements OnInit {

  locationParams: any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public stepsService: StepsPresencialService) {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.locationParams = params;
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

  goToAgendarDomicilio() {
    this.stepsService.changeStep('agendar-domicilio');
    this.router.navigate(['carga-inspeccion/automotor-zurich/presencial/agendar-domicilio'], { queryParams: this.locationParams });
  }

  goToAgendarCentro() {
    this.stepsService.changeStep('agendar-centro');
    this.router.navigate(['carga-inspeccion/automotor-zurich/presencial/agendar-centro'], { queryParams: this.locationParams });
  }

}
