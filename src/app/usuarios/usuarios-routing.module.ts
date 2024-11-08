import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      { path: '', component: UsuariosComponent, pathMatch: 'full' },
      //{ path: ':id', component: UsuarioComponent }
    ]

  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      { path: '', component: UsuarioComponent,  pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
