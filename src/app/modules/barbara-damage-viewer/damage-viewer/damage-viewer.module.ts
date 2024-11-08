import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DamageViewerComponent } from './viewer/viewer.component';
import { DamagePointComponent } from './damage-point/damage-point.component';
import { SvgVehicleComponent } from './svg-vehicle/svg-vehicle.component';



@NgModule({
  declarations: [
    DamageViewerComponent,
    DamagePointComponent,
    SvgVehicleComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    DamageViewerComponent,
    DamagePointComponent
  ]
})
export class DamageViewerModule { }
