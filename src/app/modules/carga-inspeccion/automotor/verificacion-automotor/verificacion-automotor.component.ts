import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificacion-automotor',
  templateUrl: './verificacion-automotor.component.html',
  styleUrls: ['./verificacion-automotor.component.css']
})
export class VerificacionAutomotorComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }

  nextPage() {
    this.router.navigate(['carga-inspeccion/automotor/detalles']);
  }
    
}
