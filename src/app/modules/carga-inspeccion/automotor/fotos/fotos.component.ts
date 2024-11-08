import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})
export class FotosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openWindowPhoto() {
    this.router.navigate(['inspeccion-digital/steps/fotosAuto/camara']);
  }

  nextPage() {
    this.router.navigate(['carga-inspeccion/automotor/documentos']);
  }

}
