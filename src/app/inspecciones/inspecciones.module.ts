import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeInspeccionModule } from './informe-inspeccion/informe-inspeccion.module';
import { InspeccionesRoutingModule } from './inspecciones-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InspeccionesRoutingModule,
    InformeInspeccionModule
  ]
})
export class InspeccionesModule { }
