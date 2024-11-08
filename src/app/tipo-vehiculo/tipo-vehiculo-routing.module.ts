import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoVehiculoComponent } from './tipo-vehiculo.component';

const routes: Routes = [
  {
    path: '',
    component: TipoVehiculoComponent,
    children: [
      { path: '', component: TipoVehiculoComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoVehiculoRoutingModule { }
