import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcaComponent } from './marca.component';

const routes: Routes = [
  {
    path: '',
    component: MarcaComponent,
    children: [
      { path: '', component: MarcaComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
