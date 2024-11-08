import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformeHeaderComponent } from './components/informe-header/informe-header.component';
import { InformeInspeccionComponent } from './informe-inspeccion/informe-inspeccion.component';
import { InformeFotosComponent } from './components/informe-fotos/informe-fotos.component';
import { InformeDaniosViewerComponent } from './components/informe-danios-viewer/informe-danios-viewer.component';
import { InformeDaniosDetalleComponent } from './components/informe-danios-detalle/informe-danios-detalle.component';
import { InformeGeoComponent } from './components/informe-geo/informe-geo.component';
import { InformeInspeccionRoutingModule } from './informe-inspeccion-routing.module';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { BarbaraDamageViewerModule } from 'src/app/modules/barbara-damage-viewer/barbara-damage-viewer.module';
import { GoogleMapsModule } from '@angular/google-maps'
import { TreeModule } from 'primeng/tree';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { BrbPTagComponent } from './components/brb-p-tag/brb-p-tag.component';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CarouselModule } from 'primeng/carousel';
import { InformeHeaderVERComponent } from './components/informe-header/informe-header-ver/informe-header-ver.component';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { InformeDaniosDetalleVerifeyeComponent } from './components/informe-danios-detalle-verifeye/informe-danios-detalle-verifeye.component';
import { ToastModule } from "primeng/toast";
import { PublicInformeInspeccionComponent } from './public-informe-inspeccion/public-informe-inspeccion.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    InformeHeaderComponent,
    InformeInspeccionComponent,
    PublicInformeInspeccionComponent,
    InformeFotosComponent,
    InformeDaniosViewerComponent,
    InformeDaniosDetalleComponent,
    InformeDaniosDetalleVerifeyeComponent,
    InformeGeoComponent,
    BrbPTagComponent,
    InformeHeaderVERComponent
  ],
  imports: [
    CommonModule,
    InformeInspeccionRoutingModule,
    BarbaraDamageViewerModule,
    DividerModule,
    CardModule,
    TagModule,
    GoogleMapsModule,
    TreeModule,
    GalleriaModule,
    ImageModule,
    BadgeModule,
    TooltipModule,
    FieldsetModule,
    MessagesModule,
    OverlayPanelModule,
    CarouselModule,
    TableModule,
    TimelineModule,
    ButtonModule,
    ToastModule,
    SkeletonModule
  ],
  exports: [InformeInspeccionComponent]
})
export class InformeInspeccionModule { }
