import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-zurich',
  templateUrl: './header-zurich.component.html',
  styleUrls: ['./header-zurich.component.css']
})
export class HeaderZurichComponent implements OnInit {

  showDialog: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showMesaDeAyuda = () => this.showDialog = true;

  closeMesaDeAyuda = () => this.showDialog = false;
}
