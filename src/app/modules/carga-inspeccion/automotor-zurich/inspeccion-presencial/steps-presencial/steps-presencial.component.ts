import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsPresencialService } from '../../services/stepsPresencial.service';

@Component({
  selector: 'app-steps-presencial',
  templateUrl: './steps-presencial.component.html',
  styleUrls: ['./steps-presencial.component.css']
})
export class StepsPresencialComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;

  constructor(private stepsService: StepsPresencialService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Confirmar ubicación', routerLink: 'confirmar-ubicacion' },
      { label: 'Elegir lugar', routerLink: 'elegir-lugar' },
      { label: 'Agendar', routerLink: 'agendar' },
    ];
    this.getAgendarStep();
  }

  getAgendarStep() {
    this.stepsService.source$.subscribe((object: string) => {
      this.items[2].routerLink = object;
    });
  }

}
