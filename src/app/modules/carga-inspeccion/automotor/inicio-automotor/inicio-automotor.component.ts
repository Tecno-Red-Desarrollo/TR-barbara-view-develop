import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-automotor',
  templateUrl: './inicio-automotor.component.html',
  styleUrls: ['./inicio-automotor.component.css']
})
export class InicioAutomotorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  nextPage() {
    // return console.log("se presionó botón");
    // if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
    //     this.ticketService.ticketInformation.personalInformation = this.personalInformation;
        // this.router.navigate(['inspeccion/steps/confirmarDetalles']);
        this.router.navigate(['carga-inspeccion/automotor/consideraciones']);
        // return;
  }
}
