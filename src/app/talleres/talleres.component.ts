import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/models/taller';
import { TallerService } from 'src/services/taller.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DropdownService } from 'src/services/dropdown.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {
  loading: boolean = true;
  autoResize: boolean = true;
  tallerDialog: boolean = false;
  addOrUpdate: string = '';
  totalRecords: number = 0;
  talleres: Taller[] = []; 
  taller: Taller = {
    id: 0,
    nombre: '',
    codigo_postal: 0,
    direccion: '',
    telefono: '',
    contacto: '',
    email: '',
    activo: false,
    geo: '',
    horario: '',
    lugar_nombre: '',
    lugar_id: 0,
    aseguradora_nombre: '',
    aseguradora_id: 0
  };
  lugares: any[] = []; 
  aseguradoras: any[] = [];
  selectedAseguradora: any = {id: 0, nombre: ''};
  selectedLugar: any = {id: 0, nombre: ''};
  submitted: boolean = false;

  constructor(private tallerService: TallerService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private dropdownService: DropdownService) { }

  ngOnInit(): void {     
    this.loadDropdownAseguradoras('');
    this.loadDropdownLugares('');
  }
  
  severity(active:boolean) {
    return active ? 'success' : 'danger';
  }

  value(active:boolean) {
    return active ? 'Habilitado' : 'Inhabilitado';
  }
  
  loadDropdownAseguradoras(itemSelected: string) {
    this.dropdownService.getAseguradoras().subscribe((res: any) => {
      if (res) {                     
        this.aseguradoras = res;    
        this.selectedAseguradora = this.aseguradoras.find(x => x.nombre === itemSelected);           
      }
    });
  }

  loadDropdownLugares(itemSelected: string) {
    this.dropdownService.getLugares().subscribe((res: any) => {
      if (res) {                     
        this.lugares = res;
        this.selectedLugar = this.lugares.find(x => x.nombre === itemSelected);   
      }
    });
  };

  loadTalleres(event: LazyLoadEvent) {
    this.loading = true;
    this.tallerService.getTalleres(event).subscribe((res: any) => {
        if (res) {
          this.totalRecords = res.count;
          this.talleres = res.rows;          
        }
      this.loading = false;
    });
  }
  
  hideDialog() {
    this.tallerDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.taller = {
      id: 0,
      nombre: '',
      codigo_postal: 0,
      direccion: '',
      telefono: '',
      contacto: '',
      email: '',
      activo: false,
      geo: '',
      horario: '',
      lugar_nombre: '',
      lugar_id: 0,
      aseguradora_nombre: '',
      aseguradora_id: 0
    };
    this.addOrUpdate = "Agregar";
    this.submitted = false;
    this.tallerDialog = true;
  }

  saveTaller(taller: Taller, table: any) {
    taller.id > 0 ? this.updateTaller(taller, table) : this.addTaller(taller, table);
  }

  addTaller(taller: Taller, table: any) {
    this.submitted = true;
    taller.lugar_id = this.selectedLugar.id;
    taller.aseguradora_id = this.selectedAseguradora.id;
    this.tallerService.addTaller(taller).subscribe({
      next: (res: any) => {               
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      },
      error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });       
    this.talleres = [...this.talleres];
    this.tallerDialog = false;
    table.reset();
  }

  openUpdate(taller: Taller) {
    this.loading = true;
    this.tallerService.getDetailById(taller.id).subscribe((res:any) => {
      if (res) {       
        this.taller = res;
        if(res.geo == '') this.taller.geo = 'No hay información';
        this.loadDropdownAseguradoras(res.aseguradora_nombre);
        this.loadDropdownLugares(res.lugar_nombre);
      }
    });
    this.loading = false;
    this.tallerDialog = true;
    this.addOrUpdate = "Editar";
  }

  updateTaller(taller: Taller, table: any) {
    this.submitted = true;
    taller.lugar_id = this.selectedLugar.id;
    taller.aseguradora_id = this.selectedAseguradora.id;
    this.tallerService.updateTaller(taller).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar Taller: ' + err.error.message, life: 5000 });
        }
      });   
    this.tallerDialog = false;
    table.reset();
  }

  openDelete(taller: Taller) {
    this.confirmationService.confirm({
        message: 'Está seguro que desea eliminar ' + taller.nombre + '?',
        header: 'CONFIRMAR',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.deleteTaller(taller.id);
        }
    });
  }

  deleteTaller(id: number) {
    // this.tallerService.deleteEstado(id).subscribe({
    //     next: (res: any) => {
    //     this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
    //     },
    //     error: (err: any) => {           
    //       console.log(err)
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar Estado: ' + err.error.message, life: 5000 });
    //     }
    //   });
    //   this.getEstados();  
  }
}