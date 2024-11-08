import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodigoPostalComponent } from './codigo-postal.component';

const routes: Routes = [
  { path: '', component: CodigoPostalComponent }
  // {
  //   path: '',
  //   component: CodigoPostalComponent,
  //   children: [
  //     { path: 'todos', component: CodigoPostalComponent, pathMatch: 'full' }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodigoPostalRoutingModule { }
