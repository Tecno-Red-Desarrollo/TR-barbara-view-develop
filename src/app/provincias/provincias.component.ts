import { Component, OnInit } from '@angular/core';
import { Provincia } from 'src/models/provincia';
import { ApiService } from 'src/services/api.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-provincias',
    templateUrl: './provincias.component.html',
    styleUrls: ['./provincias.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class ProvinciasComponent implements OnInit {
    provinciaDialog: boolean = false; 
    addOrUpdate: string = '';
    provincias: Provincia[] = [];
    provincia = {
      id: 0,
      nombre: '',
      alias: ''
    }

    submitted: boolean = false;

    constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.getProvincias();
    }
    
    getProvincias(){
        this.apiService.getProvincias().subscribe((res: any) => {
            if (res) {
              this.provincias = res;
            }
        });
    }  

    openNew() {
        this.provincia = {
            id: 0,
            nombre: '',
            alias: ''
          }
        this.addOrUpdate = "AGREGAR";
        this.submitted = false;
        this.provinciaDialog = true;
    }

    openUpdate(provincia: Provincia) {
        this.provincia = {...provincia};
        this.provinciaDialog = true;
        this.addOrUpdate = "EDITAR";
    }

    hideDialog() {
        this.provinciaDialog = false;
        this.submitted = false;
    }
    
    saveProvincia(provincia: Provincia){
        if(provincia.id > 0){
            this.updateProvincia(provincia);
        }
        else{
            this.addProvincia(provincia);
        }
    }

    addProvincia(provincia: Provincia){
        this.submitted = true;
        this.apiService.addProvincia(provincia).subscribe({
            next: (res: any) => {               
                this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
            },
            error: (err: any) => {           
                console.log(err)
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
            }
          });        

        this.provincias = [...this.provincias];
        this.provinciaDialog = false;
        this.getProvincias();
    }

    updateProvincia(provincia: Provincia){
        this.submitted = true;
        this.apiService.updateProvincia(provincia).subscribe({
            next: (res: any) => {
            this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
            },
            error: (err: any) => {           
              console.log(err)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar provincia: ' + err.error.message, life: 5000 });
            }
          });
        
        // this.provincias = [...this.provincias];
        this.provinciaDialog = false;
        this.getProvincias();
    }

    openDelete(provincia: Provincia) {
        this.confirmationService.confirm({
            message: 'Está seguro que desea eliminar ' + provincia.nombre + '?',
            header: 'CONFIRMAR',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteProvincia(provincia.id);
            }
        });
    }

    deleteProvincia(id: number){
        this.apiService.deleteProvincia(id).subscribe({
            next: (res: any) => {
            this.messageService.add({severity:'success', summary: 'Success', detail: res, life: 3000});
            },
            error: (err: any) => {           
              console.log(err)
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar provincia: ' + err.error.message, life: 5000 });
            }
          });
        this.getProvincias();   
    }
}