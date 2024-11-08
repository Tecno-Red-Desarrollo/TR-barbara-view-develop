import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalleresComponent } from './talleres.component'; 

const routes: Routes = [
  { path: '', component: TalleresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalleresRoutingModule { }
