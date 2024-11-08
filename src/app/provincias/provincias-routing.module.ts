import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinciasComponent } from './provincias.component';

const routes: Routes = [
  { path: '', component: ProvinciasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinciasRoutingModule { }
