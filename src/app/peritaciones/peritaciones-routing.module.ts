import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeritacionesComponent } from './components/peritaciones/peritaciones.component';

const routes: Routes = [
    { path: '', component: PeritacionesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeritacionesRoutingModule { }
