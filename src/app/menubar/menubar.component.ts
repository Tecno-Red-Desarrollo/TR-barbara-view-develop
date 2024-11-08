import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'Previas',
        items: [
          //{label: 'Auto'},
          // {label: 'Nuevo Formulario'},
          { label: 'Alta Repositorio', routerLink: ['/previas/alta-inspeccion'] }
        ]},
      { label: 'Repositorio', routerLink: ['/repositorio'], icon: PrimeIcons.TH_LARGE },
      { label: 'Carga Inspecciones', icon: PrimeIcons.CHECK_SQUARE,
        items: [
          { label: 'Zurich', routerLink: ['/carga-inspeccion/automotor-zurich/inicio'] },
          { label: 'Automotor', routerLink: ['/carga-inspeccion/automotor/inicio'] },
          { label: 'Combinado Familiar', routerLink: ['/carga-inspeccion/combinado-familiar/inicio'] }
        ]},
      { label: 'Administración', icon: PrimeIcons.SLIDERS_V,
        items: [
          { label: 'Automotores', icon: PrimeIcons.CAR,
            items: [
              { label: 'Modelos', routerLink: ['/modelo'] },
              { label: 'Marcas', routerLink: ['/marca'] },
              { label: 'Tipos de vehículo' },
              { label: 'Infoauto', routerLink: ['/infoauto']}
            ]},
          { label: 'Aseguradoras', routerLink: ['/aseguradoras'], routerLinkActiveOptions: { exact: true } },
          { label: 'Talleres', routerLink: ['/talleres'] },
          { label: 'Lugares', routerLink: ['/lugar'] },
          { label: 'Códigos Postales', routerLink: ['/codigopostal'] },
          { label: 'Usuarios', routerLink: ['/usuarios']},
          { label: 'BRBVision',icon:PrimeIcons.IMAGES, routerLink: ['/brb-vision']},
        ]}
        ,
        { label: 'Ayuda', icon: PrimeIcons.QUESTION_CIRCLE, routerLink: ['/ayuda']}
    ];
  }
}
