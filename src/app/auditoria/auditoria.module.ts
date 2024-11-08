import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditoriaManualComponent } from './auditoria-manual/auditoria-manual.component';


@NgModule({
  declarations: [
    AuditoriaManualComponent
  ],
  imports: [
    CommonModule,
    AuditoriaRoutingModule,
    SelectButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuditoriaModule { }
