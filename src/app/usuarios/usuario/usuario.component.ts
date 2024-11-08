import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/models/usuario';
import { DropdownService } from 'src/services/dropdown.service';
import { UsuarioService } from 'src/services/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  formTitle: string = "Alta";

  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    provincia_id: 0,
    localidad_id: 0,
    taller: '',
    usuario: '',
    rol_id: 0,
    audita: false,
    activo: false,
    pass: '',
    reset_pass:  '',
    cuit:  '',
    dni:  '',
    cp:  '',
    id_agenda: 0,
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
    telefono: 0,
    codigo:  '',
    repo: false
  }

  constructor(private usuarioService: UsuarioService, private dropdownService: DropdownService,  private messageService: MessageService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let usuarioID = params['id'];
      console.log('usuarioID: ' + usuarioID);

      this.usuarioService.getDetailById(usuarioID).subscribe((res: any) => {
        if (res) {
          this.usuario = res;

          console.log(this.usuario);
        }
      });
      this.formTitle = "Editar";



    });

  }

  saveUsuario() {
    console.log('Guardando...');
  }

  updateUsuario(usuario: Usuario): void {
    this.usuarioService.updateUsuario(usuario).subscribe({
      next: (res: any) => {
      this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      this.router.navigate(["/usuarios"]);
      },
      error: (err: any) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el Usuario: ' + err.error.message, life: 5000 });
      }
    });
  }


}
