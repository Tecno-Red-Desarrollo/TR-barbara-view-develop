import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoautoComponent } from './infoauto.component';

const routes: Routes = [
  {
    path: '',
    component: InfoautoComponent,
    children: [
      { path: '', component: InfoautoComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoautoRoutingModule { }
