import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCargaInspeccionComponent } from './layout-carga-inspeccion/layout-carga-inspeccion.component';
/* AUTOMOTOR */
import { InicioAutomotorComponent } from './automotor/inicio-automotor/inicio-automotor.component';
import { ConsideracionesAutomotorComponent } from './automotor/consideraciones-automotor/consideraciones-automotor.component';
import { VerificacionAutomotorComponent } from './automotor/verificacion-automotor/verificacion-automotor.component';
import { DetallesAutomotorComponent } from './automotor/detalles-automotor/detalles-automotor.component';
import { FotosComponent } from './automotor/fotos/fotos.component';
import { DocumentosComponent } from './automotor/documentos/documentos.component';
import { FinalizacionAutomotorComponent } from './automotor/finalizacion-automotor/finalizacion-automotor.component';

/* AUTOMOTOR ZURICH */
import { InicioAutomotorZurichComponent } from './automotor-zurich/inicio-automotor-zurich/inicio-automotor-zurich.component';
import { ConsideracionesAutomotorZurichComponent } from './automotor-zurich/consideraciones-automotor-zurich/consideraciones-automotor-zurich.component';
import { StepsZurichComponent } from './automotor-zurich/steps-zurich/steps-zurich.component';
import { VerificacionAutomotorZurichComponent } from './automotor-zurich/verificacion-automotor-zurich/verificacion-automotor-zurich.component';
import { DetallesAutomotorZurichComponent } from './automotor-zurich/detalles-automotor-zurich/detalles-automotor-zurich.component';
import { FotosZurichComponent } from './automotor-zurich/fotos-zurich/fotos-zurich.component';
import { DocumentosZurichComponent } from './automotor-zurich/documentos-zurich/documentos-zurich.component';
import { FinalizacionAutomotorZurichComponent } from './automotor-zurich/finalizacion-automotor-zurich/finalizacion-automotor-zurich.component';

/* COMBINADO FAMILIAR */
import { InicioCombinadoFamiliarComponent } from './combinado-familiar/inicio-combinado-familiar/inicio-combinado-familiar.component';
import { ConsideracionesCombinadoFamiliarComponent } from './combinado-familiar/consideraciones-combinado-familiar/consideraciones-combinado-familiar.component';
import { VerificacionCombinadoFamiliarComponent } from './combinado-familiar/verificacion-combinado-familiar/verificacion-combinado-familiar.component';
import { CamaraComponent } from './automotor/fotos/camara/camara.component';
import { CamaraZurichComponent } from './automotor-zurich/camara-zurich/camara-zurich.component';
import { ErrorInspeccionComponent } from './error-inspeccion/error-inspeccion.component';
import { StepsPresencialComponent } from './automotor-zurich/inspeccion-presencial/steps-presencial/steps-presencial.component';
import { ConfirmarUbicacionComponent } from './automotor-zurich/inspeccion-presencial/confirmar-ubicacion/confirmar-ubicacion.component';
import { ElegirLugarComponent } from './automotor-zurich/inspeccion-presencial/elegir-lugar/elegir-lugar.component';
import { AgendarDomicilioComponent } from './automotor-zurich/inspeccion-presencial/agendar-domicilio/agendar-domicilio.component';
import { AgendarCentroComponent } from './automotor-zurich/inspeccion-presencial/agendar-centro/agendar-centro.component';
import { InicioProductorZurichComponent } from './automotor-zurich/inicio-productor-zurich/inicio-productor-zurich.component';
import { ReenvioAseguradoProductorZurichComponent } from './automotor-zurich/reenvio-asegurado-productor-zurich/reenvio-asegurado-productor-zurich.component';
import { FinalizacionProductorZurichComponent } from './automotor-zurich/finalizacion-productor-zurich/finalizacion-productor-zurich.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutCargaInspeccionComponent,
    children: [
      /* AUTOMOTOR */
      { path: 'automotor/inicio', component: InicioAutomotorComponent },
      { path: 'automotor/consideraciones', component: ConsideracionesAutomotorComponent },
      { path: 'automotor/verificacion', component: VerificacionAutomotorComponent },
      { path: 'automotor/detalles', component: DetallesAutomotorComponent },
      { path: 'automotor/fotos', component: FotosComponent },
      { path: 'automotor/fotos/camara', component: CamaraComponent },
      { path: 'automotor/documentos', component: DocumentosComponent },
      { path: 'automotor/finalizacion', component: FinalizacionAutomotorComponent },
      /* AUTOMOTOR ZURICH */
      { path: 'automotor-zurich/inicio', component: InicioAutomotorZurichComponent },
      { path: 'automotor-zurich/consideraciones', component: ConsideracionesAutomotorZurichComponent },
      {
        path: 'automotor-zurich/steps', component: StepsZurichComponent,
        children: [
          { path: 'confirmar-auto', component: VerificacionAutomotorZurichComponent },
          { path: 'confirmar-detalles', component: DetallesAutomotorZurichComponent },
          { path: 'fotos', component: FotosZurichComponent },
          { path: 'documentacion', component: DocumentosZurichComponent },
        ]
      },
      {
        path: 'automotor-zurich/presencial', component: StepsPresencialComponent,
        children: [
          { path: 'confirmar-ubicacion', component: ConfirmarUbicacionComponent },
          { path: 'elegir-lugar', component: ElegirLugarComponent },
          { path: 'agendar-domicilio', component: AgendarDomicilioComponent },
          { path: 'agendar-centro', component: AgendarCentroComponent }
        ]
      },
      { path: 'automotor-zurich/camara', component: CamaraZurichComponent },
      { path: 'automotor-zurich/finalizacion', component: FinalizacionAutomotorZurichComponent },
      /* Es problable que tenga que modificar los nombres de los nuevos componentes */
      { path: 'automotor-zurich/inicio-productor', component: InicioProductorZurichComponent},
      { path: 'automotor-zurich/reenvio-asegurado-productor', component: ReenvioAseguradoProductorZurichComponent},
      { path: 'automotor-zurich/finalizacion-productor', component: FinalizacionProductorZurichComponent},
      { path: 'error', component: ErrorInspeccionComponent },
      /* COMBINADO FAMILIAR */
      { path: 'combinado-familiar/inicio', component: InicioCombinadoFamiliarComponent },
      { path: 'combinado-familiar/consideraciones', component: ConsideracionesCombinadoFamiliarComponent },
      { path: 'combinado-familiar/verificacion', component: VerificacionCombinadoFamiliarComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaInspeccionRoutingModule { }
