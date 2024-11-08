import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-automotor',
  templateUrl: './detalles-automotor.component.html',
  styleUrls: ['./detalles-automotor.component.css']
})
export class DetallesAutomotorComponent implements OnInit {

  gncOption : any[] = [];
  airbagOption: any[] = [];
  auxWheelOption: any[] = [];
  vtvOption: any[] = [];

  auxWheelValue: string = "on";
  airbagValue: string = "off";
  gncValue: string = "off";
  vtvValue: string = "off";

  
  constructor(private router: Router) { 
    this.gncOption = [{label: 'SI', gncValue: 'on'}, {label: 'NO', gncValue: 'off'}];
    this.airbagOption = [{label: 'SI', airbagValue: 'on'}, {label: 'NO', airbagValue: 'off'}];
    this.auxWheelOption = [{label: 'SI', auxWheelValue: 'on'}, {label: 'NO', auxWheelValue: 'off'}];
    this.vtvOption = [{label: 'SI', vtvValue: 'on'}, {label: 'NO', vtvValue: 'off'}];
  }

  ngOnInit(): void {
  
  }

  nextPage() {
    this.router.navigate(['carga-inspeccion/automotor/fotos']);
  }

}
