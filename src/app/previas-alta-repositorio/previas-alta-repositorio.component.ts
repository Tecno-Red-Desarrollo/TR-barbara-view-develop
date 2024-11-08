import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previas-alta-repositorio',
  templateUrl: './previas-alta-repositorio.component.html',
  styleUrls: ['./previas-alta-repositorio.component.css']
})
export class PreviasAltaRepositorioComponent implements OnInit {


  displayModal: boolean;

  constructor() {
    this.displayModal = true;
  }

  ngOnInit(): void {

  }
}
