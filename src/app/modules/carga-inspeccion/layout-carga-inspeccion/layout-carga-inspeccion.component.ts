import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-carga-inspeccion',
  templateUrl: './layout-carga-inspeccion.component.html',
  styleUrls: ['./layout-carga-inspeccion.component.css']
})
export class LayoutCargaInspeccionComponent implements OnInit {

  steps: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {}

}
