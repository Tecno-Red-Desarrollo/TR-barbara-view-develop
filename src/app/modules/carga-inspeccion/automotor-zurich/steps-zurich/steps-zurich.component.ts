import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsDigitalService } from '../services/stepsDigital.service';

@Component({
  selector: 'app-steps-zurich',
  templateUrl: './steps-zurich.component.html',
  styleUrls: ['./steps-zurich.component.css', '../css/zurich-style.css']
})
export class StepsZurichComponent implements OnInit {

  items: MenuItem[] = [];
  activeIndex: number = 0;
  backcolor = 'red';

  constructor(private stepsService: StepsDigitalService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Confirmar datos', routerLink: 'confirmar-auto' },
      { label: 'Confirmar características', routerLink: 'confirmar-detalles' },
      { label: 'Fotos', routerLink: 'fotos' },
    ];
    this.onCompleteStep();
    /*    this.items = [
          { label: 'Confirmar datos', routerLink: 'confirmar-auto' },
          { label: 'Declarar características', routerLink: 'confirmar-detalles' },
          { label: 'Fotos', routerLink: 'fotos' },
          { label: 'Documentación', routerLink: 'documentacion' }
          { label: 'Fotos', routerLink: 'fotos' }
          // { label: 'Documentación', routerLink: 'documentacion' }
        ];
    */
  }

  onCompleteStep() {
    this.stepsService.source$.subscribe((index: number) => {
      if (index > -1) this.items[index].styleClass = "complete";
    });
  }

}
