import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LugarFormComponent } from './lugar-form/lugar-form.component';
import { LugaresComponent } from './lugares.component'; 

const routes: Routes = [
  {
    path: '',
    component: LugaresComponent,
    children: [
      { path: 'todos', component: LugaresComponent, pathMatch: 'full' }
    ]
  },
  {
    path: 'crear',
    component: LugarFormComponent
  },
  {
    path: ':id',
    component: LugarFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LugaresRoutingModule { }
