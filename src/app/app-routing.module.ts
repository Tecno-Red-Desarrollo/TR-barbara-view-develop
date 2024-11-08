import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBarbaraComponent } from './layout-barbara/layout-barbara.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBarbaraComponent,
    children: [
      { path: 'infoauto', loadChildren: () => import('./infoauto/infoauto.module').then(m => m.InfoautoModule) },
      { path: 'repositorio', loadChildren: () => import('./repositorio/repositorio.module').then(m => m.RepositorioModule) },
      { path: 'peritaciones', loadChildren: () => import('./peritaciones/peritaciones.module').then(m => m.PeritacionesModule) },
      { path: 'modelo', loadChildren: () => import('./modelo/modelo.module').then(m => m.ModeloModule) },
      { path: 'tipo-vehiculo', loadChildren: () => import('./tipo-vehiculo/tipo-vehiculo.module').then(m => m.TipoVehiculoModule) },
      { path: 'provincias', loadChildren: () => import('./provincias/provincias.module').then(m => m.ProvinciasModule) },
      { path: 'aseguradoras', loadChildren: () => import('./aseguradoras/aseguradoras.module').then(m => m.AseguradorasModule) },
      { path: 'marca', loadChildren: () => import('./marca/marca.module').then(m => m.MarcaModule) },
      { path: 'estados', loadChildren: () => import('./estados/estados.module').then(m => m.EstadosModule) },
      { path: 'talleres', loadChildren: () => import('./talleres/talleres.module').then(m => m.TalleresModule) },
      { path: 'ayuda', loadChildren: () => import('./ayuda/ayuda.module').then(m => m.AyudaModule) },
      { path: 'previas/alta-inspeccion', loadChildren: () => import('./previas-alta-repositorio/previas-alta-repositorio.module').then(m => m.PreviasAltaRepositorioModule) },
      { path: 'lugar', loadChildren: () => import('./lugares/lugares.module').then(m => m.LugaresModule) },
      { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'codigopostal', loadChildren: () => import('./codigo-postal/codigo-postal.module').then(m => m.CodigoPostalModule) },
      { path: 'brb-vision', loadChildren: () => import('./brb-vision/brb-vision.module').then(m => m.BrbVisionModule) },
      { path: 'brb-vision', loadChildren: () => import('./brb-vision/brb-vision.module').then(m => m.BrbVisionModule) },
      { path: 'inspecciones', loadChildren: () => import('./inspecciones/inspecciones.module').then(m => m.InspeccionesModule) },
      { path: 'auditoria', loadChildren: () => import('./auditoria/auditoria.module').then(m => m.AuditoriaModule) },
    ]
  },
  { path: 'inspecciones/informe', loadChildren: () => import('./inspecciones/informe-inspeccion/informe-inspeccion.module').then(m => m.InformeInspeccionModule) },
  { path: 'peritaciones/informe', loadChildren: () => import('./peritaciones/informe-peritacion/informe-peritacion.module').then(m => m.InformePeritacionModule) }
  // carga de inspecciones
  // { path: 'carga-inspeccion', loadChildren: () => import('./modules/carga-inspeccion/carga-inspeccion.module').then(m => m.CargaInspeccionModule) },
  // { path: '',
  //   component: LayoutCargaInspeccionComponent,
  //   children: [
  //     { path: 'carga-inspeccion', loadChildren: () => import('./carga-inspeccion/carga-inspeccion.module').then(m => m.CargaInspeccionModule)}
  //   ]
  // },
  // redirect al home
  //{ path: '**', redirectTo: '' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
