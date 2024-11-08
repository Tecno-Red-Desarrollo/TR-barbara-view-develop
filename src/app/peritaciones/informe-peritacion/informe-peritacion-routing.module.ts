import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeritacionesComponent } from '../components/peritaciones/peritaciones.component';
import { InformePeritacionComponent } from './informe-peritacion/informe-peritacion.component';

const routes: Routes = [
    {
        path: ':id',
        component: InformePeritacionComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InformePeritacionRoutingModule { }
