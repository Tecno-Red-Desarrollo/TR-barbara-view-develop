import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformeInspeccionComponent } from './informe-inspeccion/informe-inspeccion.component';
import { PublicInformeInspeccionComponent } from './public-informe-inspeccion/public-informe-inspeccion.component';

const routes: Routes = [
    {
        path: 'public/:id',
        component: PublicInformeInspeccionComponent
    },
    {
        path: ':id',
        component: InformeInspeccionComponent
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InformeInspeccionRoutingModule { }
