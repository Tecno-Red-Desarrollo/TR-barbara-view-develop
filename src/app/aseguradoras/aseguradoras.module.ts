import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

import { AseguradorasRoutingModule } from './aseguradoras-routing.module';
import { AseguradorasComponent } from './aseguradoras/aseguradoras.component';
import { AseguradoraComponent } from './aseguradora/aseguradora.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AseguradorasComponent,
    AseguradoraComponent
  ],
  imports: [
    CommonModule,
    AseguradorasRoutingModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule
  ]
})
export class AseguradorasModule { }
