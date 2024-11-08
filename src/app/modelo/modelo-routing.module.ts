import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeloComponent } from './modelo.component';

const routes: Routes = [
  {
    path: '',
    component: ModeloComponent,
    children: [
      { path: '', component: ModeloComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }
