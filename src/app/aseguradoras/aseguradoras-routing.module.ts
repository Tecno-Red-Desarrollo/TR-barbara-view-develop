import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AseguradorasComponent } from './aseguradoras/aseguradoras.component';
import { AseguradoraComponent } from './aseguradora/aseguradora.component';

const routes: Routes = [
  {
    path: '',
    component: AseguradorasComponent,
    children: [
      { path: '', component: AseguradorasComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'aseguradora',
    component: AseguradoraComponent,
    children: [
      { path: '', component: AseguradoraComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AseguradorasRoutingModule { }
