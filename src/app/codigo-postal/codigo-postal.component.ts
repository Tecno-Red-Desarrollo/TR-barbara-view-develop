import { Component, OnInit } from '@angular/core';
import { CodigoPostal } from 'src/models/codigo-postal';
import { CodigoPostalService } from 'src/services/codigoPostal.service';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-codigo-postal',
  templateUrl: './codigo-postal.component.html',
  styleUrls: ['./codigo-postal.component.css']
})
export class CodigoPostalComponent implements OnInit {
  loading: boolean = true;
  autoResize: boolean = true;
  postalCodeDialog: boolean = false;
  addOrUpdate: string = '';
  totalRecords: number = 0;
  postalCodes: CodigoPostal[] = [];
  postalCode : CodigoPostal = {
    id: 0,
    codigo_postal: 0,
    ciudad_nombre: '',
    provincia_id: 0
  };
  submitted: boolean = false;

  constructor(private postalCodeService: CodigoPostalService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  loadPostalCodes(event: LazyLoadEvent) {
    this.loading = true;
    this.postalCodeService.getPostalCodes(event).subscribe((res: any) => {
      if(res) {
        this.totalRecords = res.count;
        this.postalCodes = res.rows;
      }
      this.loading = false;
    });
  }

  hideDialog() {
    this.postalCodeDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.postalCode = {
      id: 0,
      codigo_postal: 0,
      ciudad_nombre: '',
      provincia_id: 0
    };
    this.addOrUpdate = "Agregar";
    this.submitted = false;
    this.postalCodeDialog = true;
  }

  savePostalCode(postalCode: CodigoPostal, table: any) {
    this.submitted = true;
    postalCode.id > 0 ? this.updatePostalCode(postalCode, table) : this.addPostalCode(postalCode, table);
  }

  addPostalCode(postalCode: CodigoPostal, table: any) {
    this.submitted = true;
    this.postalCodeService.addPostalCode(postalCode).subscribe({
      next: (res: any) => {               
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      },
      error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });       
    this.postalCodes = [...this.postalCodes];
    this.postalCodeDialog = false;
    table.reset();
  }

  openUpdate(postalCode: CodigoPostal) {
    this.loading = true;
    this.postalCodeService.getDetailById(postalCode.id).subscribe((res:any) => {
      if (res) {       
        this.postalCode = res;
      }
    });
    this.loading = false;
    this.postalCodeDialog = true;
    this.addOrUpdate = "Editar";
  }

  updatePostalCode(postalCode: CodigoPostal, table: any) {
    this.submitted = true;
    this.postalCodeService.updatePostalCode(postalCode).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar código postal: ' + err.error.message, life: 5000 });
        }
      });   
    this.postalCodeDialog = false;
    table.reset();
  }

  openDelete(postalCode: CodigoPostal, table: any) {
    this.confirmationService.confirm({
        message: 'Está seguro que desea eliminar ' + postalCode.codigo_postal + '?',
        header: 'CONFIRMAR',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deletePostalCode(postalCode.id, table);
        }
    });
  }

  deletePostalCode(id: number, table: any) {
    this.postalCodeService.deletePostalCode(id).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar Estado: ' + err.error.message, life: 5000 });
        }
      });
      table.reset();  
  }
}
