import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarbaraDamageViewerComponent } from './barbara-damage-viewer/barbara-damage-viewer.component';
import { DamageViewerModule } from './damage-viewer/damage-viewer.module';



@NgModule({
  declarations: [
    BarbaraDamageViewerComponent
  ],
  imports: [
    CommonModule,
    DamageViewerModule
  ],
  exports:[
    BarbaraDamageViewerComponent
  ]
})
export class BarbaraDamageViewerModule { }
