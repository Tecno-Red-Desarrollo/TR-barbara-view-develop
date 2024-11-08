import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/models/lugar';
import { LugarService } from 'src/services/lugar.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DropdownService } from 'src/services/dropdown.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  loading: boolean = true;
  lugarDialog: boolean = false;
  addOrUpdate: string = '';
  autoResize: boolean = true;
  totalRecords: number = 0;
  lugares: Lugar[] = []; 
  lugar: Lugar = {
    id: 0,
    lugar_nombre: '',
    provincia_codigo: 0,
    provincia_nombre: '',
    ciudad_id: 0,
    ciudad_nombre: '',
    codigo_postal: 0,
    clave_provloc: 0,
    dom_previa_auto: false,
    previa_hogar: false,
    centro: false,
    siniestro_auto: false,
    zona_trd: '',
    activo: false,
    zona_tarifaria: ''
  };
  provincias: any[] = [];
  selectedProvincia: any = {id: 0, nombre: ''};

  submitted: boolean = false;

  constructor(private lugarService: LugarService,
              private dropdownService: DropdownService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadDropdownProvincias('');
  }

  loadLugares(event: LazyLoadEvent) {
    this.loading = true;
    this.lugarService.getLugares(event).subscribe((res: any) => {
        if (res) {
          this.totalRecords = res.count;
          this.lugares = res.rows;          
        }
      this.loading = false;
    });
  }

  iconActive(active : boolean){
    return active ? `pi pi-check text-color-green` : `pi pi-times text-color-red`
  }

  severity(active : boolean) {
    return active == true ? 'success' : active == false ? 'danger' : 'warning';
  }

  value(active : boolean) {
    return active == true ? 'Activo' : active == false ? 'Inactivo' : 'No info';
  }

  loadDropdownProvincias(itemSelected: string) {
    this.dropdownService.getProvincias().subscribe((res: any) => {
      if (res) {                     
        this.provincias = res;    
        this.selectedProvincia = this.provincias.find(x => x.nombre === itemSelected);           
      }
    });
  }

  hideDialog() {
    this.lugarDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.lugar = {
      id: 0,
      lugar_nombre: '',
      provincia_codigo: 0,
      provincia_nombre: '',
      ciudad_id: 0,
      ciudad_nombre: '',
      codigo_postal: 0,
      clave_provloc: 0,
      dom_previa_auto: false,
      previa_hogar: false,
      centro: false,
      siniestro_auto: false,
      zona_trd: '',
      activo: false,
      zona_tarifaria: ''
    };
    this.addOrUpdate = "Agregar";
    this.submitted = false;
    this.lugarDialog = true;
  }

  saveLugar(lugar: Lugar, table: any) {
    lugar.id > 0 ? this.updateLugar(lugar, table) : this.addLugar(lugar, table);
  }

  addLugar(lugar: Lugar, table: any) {
    this.submitted = true;
    lugar.provincia_codigo = this.selectedProvincia.id;
    this.lugarService.addLugar(lugar).subscribe({
      next: (res: any) => {               
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      },
      error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });       
    this.lugares = [...this.lugares];
    this.lugarDialog = false;
    table.reset();
  }

  openUpdate(lugar_id: number) {
    this.loading = true;
    this.lugarService.getDetailById(lugar_id).subscribe((res:any) => {
      if (res) {
        this.lugar = res;
        this.loadDropdownProvincias(res.provincia_nombre);
      }
    });
    this.loading = false;
    this.lugarDialog = true;
    this.addOrUpdate = "Editar";
  }

  updateLugar(lugar: Lugar, table: any) {
    this.submitted = true;
    lugar.provincia_codigo = this.selectedProvincia.id;
    this.lugarService.updateLugar(lugar).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar Lugar: ' + err.error.message, life: 5000 });
        }
      });   
    this.lugarDialog = false;
    table.reset();
  }
}
