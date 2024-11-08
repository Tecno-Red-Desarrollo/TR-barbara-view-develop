import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consideraciones-automotor',
  templateUrl: './consideraciones-automotor.component.html',
  styleUrls: ['./consideraciones-automotor.component.css']
})
export class ConsideracionesAutomotorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  nextPage() {
    this.router.navigate(['carga-inspeccion/automotor/verificacion']);
  }

}
