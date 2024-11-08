import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviasAltaRepositorioComponent } from './previas-alta-repositorio.component';

const routes: Routes = [
  {
    path: '',
    component: PreviasAltaRepositorioComponent,
    children: [
      { path: '', component: PreviasAltaRepositorioComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviasAltaRepositorioRoutingModule { }
