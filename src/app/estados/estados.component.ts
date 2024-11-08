import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/models/estado';
import { ApiService } from 'src/services/api.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})

export class EstadosComponent implements OnInit {
  autoResize: boolean = true;
  estadoDialog: boolean = false;
  addOrUpdate: string = '';
  estados: Estado[] = [];
  estado = {
    id: 0,
    nombre: '',
    enombre: '',
    siniestros: true,
    agenda: true,
    rol: 0,
    nombrePublico: ''
  };
  submitted: boolean = false;

  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getEstados();
  }

  getEstados(){
    this.apiService.getEstados().subscribe((res: any) => {
        if (res) {
          this.estados = res;
        }
    });
  }

  openNew() {
    this.estado = {
      id: 0,
      nombre: '',
      enombre: '',
      siniestros: true,
      agenda: true,
      rol: 0,
      nombrePublico: ''
    };
    this.addOrUpdate = "AGREGAR";
    this.submitted = false;
    this.estadoDialog = true;
  }

  openUpdate(estado: Estado) {
    this.estado = {...estado};
    this.estadoDialog = true;
    this.addOrUpdate = "EDITAR";
  }

  hideDialog() {
    this.estadoDialog = false;
    this.submitted = false;
  }

  saveEstado(estado: Estado){
    estado.id > 0 ? this.updateEstado(estado) : this.addEstado(estado);
  }

  addEstado(estado: Estado){
    this.submitted = true;
    this.apiService.addEstado(estado).subscribe({
        next: (res: any) => {               
            this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
        },
        error: (err: any) => {           
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
        }
      });        

    this.estados = [...this.estados];
    this.estadoDialog = false;
    this.getEstados();
  }

  updateEstado(estado: Estado){
    this.submitted = true;
    this.apiService.updateEstado(estado).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar Estado: ' + err.error.message, life: 5000 });
        }
      });
    
    this.estadoDialog = false;
    this.getEstados();
  }

  openDelete(estado: Estado) {
    this.confirmationService.confirm({
        message: 'Está seguro que desea eliminar ' + estado.nombre + '?',
        header: 'CONFIRMAR',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteEstado(estado.id);
        }
    });
  }

  deleteEstado(id: number){
    this.apiService.deleteEstado(id).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar Estado: ' + err.error.message, life: 5000 });
        }
      });
      this.getEstados();  
  }
}