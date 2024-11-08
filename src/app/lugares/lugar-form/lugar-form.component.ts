import { Component, OnInit } from '@angular/core';
import { LugarService } from 'src/services/lugar.service';
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';
import { Lugar } from 'src/models/lugar';
import { DropdownService } from 'src/services/dropdown.service';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.css']
})
export class LugarFormComponent implements OnInit {
  formTitle: string = 'Crear';
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
  codigoPostalCiudad: string = '';
  provincias: any[] = [];
  selectedProvincia: any = {id: 0, nombre: ''};
  ciudades: any[] = [];
  selectedCiudad: any = {id: 0, nombre: '', codigo_postal: 0};
  submitted: boolean = false;
  cp_nombre: any[] = [];

  constructor(
    private lugarService: LugarService,
    private dropdownService: DropdownService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id")!;   
    if(id > 0) this.loadLugar(id);
    this.loadDropdownProvincias();
  }
  
  onChangeProvincia(provinciaEvent: any){
    this.loadDropdownCiudades('', provinciaEvent.id);   
  }

  loadLugar(id: number) {
    this.lugarService.getDetailById(id).subscribe((res:any) => {    
        if (res) {
          this.formTitle = "Editar";
          this.lugar = res;
          this.codigoPostalCiudad = this.lugar.codigo_postal + " - " + this.lugar.ciudad_nombre;
          res.activo == 1 ? this.lugar.activo = true : this.lugar.activo = false;   
          
          this.loadDropdownProvincias(res.provincia_nombre);
          this.loadDropdownCiudades(res.provincia_nombre, res.provincia_codigo);
          //this.loadDropdownCiudades(res.provincia_nombre, res.codigo_postal);        
        }  
      });
    }

  loadDropdownProvincias(itemSelected?: string) {
    this.dropdownService.getProvincias().subscribe((res: any) => {
      if (res) {                     
        this.provincias = res;    
        this.selectedProvincia = this.provincias.find(x => x.nombre === itemSelected);          
      }
    });
  }

  loadDropdownCiudades(itemSelected?: string, id?: number) {
    this.dropdownService.getCiudades(id).subscribe((res: any) => {
      if (res) {               
        this.ciudades = res.map((data: any) => {
          return {
            ...data,
            displayCiudad_CP: data.codigo_postal + ' - ' + data.nombre,
          }
        });
        this.selectedCiudad = this.ciudades.find(x => x.nombre === itemSelected);          
      }
    });
  }
  
  saveLugar(lugar: Lugar) {
    lugar.id > 0 ? this.updateLugar(lugar) : this.addLugar(lugar);
  }

  updateLugar(lugar: Lugar): void {
    this.lugarService.updateLugar(lugar).subscribe({
      next: (res: any) => {
      this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
      this.router.navigate(["/lugar/todos"]);
      },
      error: (err: any) => {           
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar Lugar: ' + err.error.message, life: 5000 });
      }
    });
  }

  addLugar(lugar: Lugar) {
    // lugar.provincia_codigo = this.selectedProvincia.id;
    // lugar.ciudad_id = this.selectedCiudad.id;
    this.lugarService.addLugar(lugar).subscribe({
      next: (res: any) => {               
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
          this.router.navigate(["/lugar/todos"]);
      },
      error: (err: any) => {           
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });       
  }

  cancel(): void {
    this.router.navigate(["/lugar/todos"]);
  }

}