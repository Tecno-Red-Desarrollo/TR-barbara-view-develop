import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoriaManualComponent } from './auditoria-manual/auditoria-manual.component';

const routes: Routes = [
    {
        path: ':id',
        component: AuditoriaManualComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuditoriaRoutingModule { }
