import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { InfoautoRoutingModule } from './infoauto-routing.module';
import { InfoautoComponent } from './infoauto.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InfoautoComponent
  ],
  imports: [
    CommonModule,
    InfoautoRoutingModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ]
})
export class InfoautoModule { }
