import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Usuario } from 'src/models/usuario';
import { ApiService } from 'src/services/api.service';
import { DropdownService } from 'src/services/dropdown.service';
import { UsuarioService } from 'src/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild('tablaUsuarios') tablaUsuarios: any = {};

  aseguradoras: any[] = [];
  selectedAseguradora: any = {id: 0, nombre: ''};
  talleres: any[] = [];
  selectedTaller: any = {id: 0, nombre: ''};
  localidades: any[] = [];
  selectedLocalidad: any = {id: 0, nombre: ''};
  roles: any[] = [];
  selectedRol: any = {};
  activo: any[] = [];
  selectedActivo: any = {};
  mobiles: any[] = [];
  selectedMobile: any[] = [];

  usuarios: Usuario[] = [];

  loading: boolean = false;

  totalRecords: number = 0;

  marcaDialog: boolean = false;
  addOrUpdate: string = '';

  submitted = false;
  usuariosDialog: boolean = false;
  formTitle: string = "";

  usuario = {
    id: 0,
    nombre: "",
    apellido: "",
    email: "",
    provincia: 0,
    localidad: 0,
    taller: "",
    usuario: "",
    rol: 0,
    audita: false,
    activo: false,
    reset_pass: "",
    dni: "",
    cuit: "",
    cp: "",
    pass: "",
    telefono: 0,
    codigo: "",
    puede_auditar: false,
    aviso_prueba: false,
    tipo1: false,
    tipo2: false,
    tipo3: false,
    tipo4: false,
    tipo5: false,
    tipo6: false,
    tipo7: false,
    tipo8: false,
    tipo9: false,
    repo: false,
    id_agenda: 0
  }

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private dropdownService: DropdownService, private usuarioService: UsuarioService, private apiService: ApiService,  private router: Router) {

  }

  ngOnInit(): void {
    this.loadDropdownAseguradoras('');
    // this.loadDropdownTaller('');
    this.loadUsuarios();

    this.loadDropdownLocalidad('');
  }

  iconActive(active : boolean){
    return active ? `pi pi-check text-color-green` : `pi pi-times text-color-red`
  }

  iconReset(reset : string){
    return reset ? `pi pi-exclamation-triangle bg-color-red` : ``
  }

  loadDropdownAseguradoras(itemSelected: string) {
    this.dropdownService.getAseguradoras().subscribe((res: any) => {
      if (res) {
        this.aseguradoras = res;
        this.selectedAseguradora = this.aseguradoras.find(x => x.nombre === itemSelected);
      }
    });
  }

  loadDropdownLocalidad(itemSelected: string) {
    this.dropdownService.getLugares().subscribe((res: any) => {
      if (res) {
        this.localidades = res;
        this.selectedLocalidad = this.localidades.find(x => x.nombre === itemSelected);
      }
    });
  };

  /*loadUsuarios(event: LazyLoadEvent) {
    this.loading = true;
    this.usuarioService.getUsuarios(event).subscribe((res: any) => {
        if (res) {
          this.totalRecords = res.count;
          this.usuarios = res.rows;
        }
      this.loading = false;
    });
  } */

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe((res: any) => {
        if (res) {
          this.usuarios = res;
        }
    });
}

  loadDropdownTaller(itemSelected: string) {
    this.dropdownService.getUsuarios().subscribe((res: any) => {
      if (res) {
        this.talleres = res;
        this.selectedTaller = this.talleres.find(x => x.taller === itemSelected);
      }
    });
  }


  /*setFilter(v: any, filter: string, matchMode: string = 'contains') {

    let filterValue = v || null;
    if (filterValue && typeof filterValue == 'object' && filterValue.length == 0) filterValue = null;

    if (filterValue) {
      this.tablaUsuarios.filters[filter] = { value: filterValue, matchMode: matchMode };
    } else {
      delete this.tablaUsuarios.filters[filter];
    }
  }*/

  openUpdate(usuario_id: number) {
    this.loading = true;
    this.usuarioService.getDetailById(usuario_id).subscribe((res:any) => {
      if (res) {
        this.usuario = res;
      }
    });
    this.loading = false;
    this.addOrUpdate = "Editar";
  }

  /*addUsuario(usuario: Usuario, table: any) {
    this.submitted = true;
    this.usuarioService.addUsuario(usuario).subscribe({
      next: (res: any) => {
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      },
      error: (err: any) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });
    this.usuarios = [...this.usuarios];
    table.reset();
  }*/

  updateUsuario(usuario: Usuario, table: any) {
    this.submitted = true;
    this.usuarioService.updateUsuario(usuario).subscribe({
        next: (res: any) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message, life: 3000});
        },
        error: (err: any) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el Usuario: ' + err.error.message, life: 5000 });
        }
      });
    table.reset();
  }

  editar(usuario: Usuario) {
    // console.log('Editar');
    this.router.navigate(['/usuarios/usuario', { id: usuario.id } ]);

  }

//}
}
