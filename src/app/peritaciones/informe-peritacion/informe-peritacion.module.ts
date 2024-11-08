import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformePeritacionComponent } from './informe-peritacion/informe-peritacion.component';
import { InformePeritacionDaniosDetalleComponent } from './components/informe-peritacion-danios-detalle/informe-peritacion-danios-detalle.component';
import { InformePeritacionDaniosDetalleVerifeyeComponent } from './components/informe-peritacion-danios-detalle-verifeye/informe-peritacion-danios-detalle-verifeye.component';
import { InformePeritacionDaniosViewerComponent } from './components/informe-peritacion-danios-viewer/informe-peritacion-danios-viewer.component';
import { InformePeritacionFotosComponent } from './components/informe-peritacion-fotos/informe-peritacion-fotos.component';
import { InformePeritacionGeoComponent } from './components/informe-peritacion-geo/informe-peritacion-geo.component';
import { InformePeritacionHeaderComponent } from './components/informe-peritacion-header/informe-peritacion-header.component';
import { InformePeritacionRoutingModule } from './informe-peritacion-routing.module';
import { BarbaraDamageViewerModule } from 'src/app/modules/barbara-damage-viewer/barbara-damage-viewer.module';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { GoogleMapsModule } from '@angular/google-maps';
import { TreeModule } from 'primeng/tree';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrbPeritacionTagComponent } from './components/brb-peritacion-tag/brb-peritacion-tag.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    InformePeritacionComponent,
    InformePeritacionDaniosDetalleComponent,
    InformePeritacionDaniosDetalleVerifeyeComponent,
    InformePeritacionDaniosViewerComponent,
    InformePeritacionFotosComponent,
    InformePeritacionGeoComponent,
    InformePeritacionHeaderComponent,
    BrbPeritacionTagComponent
  ],
  imports: [
    CommonModule,
    InformePeritacionRoutingModule,
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
    SpeedDialModule,
    DialogModule,
    InputTextareaModule,
    SkeletonModule
  ]
})
export class InformePeritacionModule { }
