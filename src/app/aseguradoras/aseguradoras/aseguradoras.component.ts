import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {LazyLoadEvent, MessageService} from "primeng/api";

import { Aseguradora } from 'src/models/aseguradoras/aseguradora';
import { AseguradoraService } from 'src/services/aseguradora.service';
import { DropdownService } from 'src/services/dropdown.service';

@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.css']
})
export class AseguradorasComponent implements OnInit {

  loading: boolean;
  totalRecords: number;
  aseguradoras: Aseguradora[] = [];

  aseguradora = new Aseguradora();

  submitted: boolean = false;

  constructor(private aseguradoraService: AseguradoraService, private messageService: MessageService, private router: Router, private dropdownService: DropdownService) {
    this.loading = false;
    this.totalRecords = -1;
  }

  ngOnInit(): void {
    console.log('Inicializando componente Aseguradoras.');
    this.getAseguradoras();
  }

  iconActive(active : boolean){
    return active ? `pi pi-check text-color-green` : `pi pi-times text-color-red`;
  }

  buscar() {
    this.getAseguradoras();
  }

  loadAseguradoras(event: LazyLoadEvent) {
    this.loading = true;
    this.getAseguradoras();
    this.loading = false;
  }

  getAseguradoras() {
    this.aseguradoraService.getAseguradoras().subscribe(res => {
      if (res) {
        this.aseguradoras = res;
      }
    });
  }



  addAseguradora(aseguradora: Aseguradora, table: any) {
    this.submitted = true;
    this.aseguradoraService.addAseguradora(aseguradora).subscribe({
      next: (res: any) => {
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      },
      error: (err: any) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });

    this.aseguradoras = [...this.aseguradoras];

    table.reset();
  }

  editar(aseguradora: Aseguradora) {
    console.log(aseguradora);
    this.router.navigate(['/aseguradoras/aseguradora', { id  : aseguradora.id } ]);
  }



  deleteAseguradora(id: number, table: any) {
    this.aseguradoraService.deleteAseguradora(id).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la Aseguradora: ' + err.error.message, life: 5000 });
        }
      });
      table.reset();
  }
}
