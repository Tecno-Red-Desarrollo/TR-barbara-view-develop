import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AyudaComponent } from './ayuda.component';
import { AyudaRoutingModule } from './ayuda-routing.module';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [
    AyudaComponent
  ],
  imports: [
    CommonModule,
    AyudaRoutingModule,
    CardModule,
    MenubarModule,
    ButtonModule
  ]
})
export class AyudaModule { }
