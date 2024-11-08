import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloComponent } from './modelo.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModeloComponent
  ],
  imports: [
    CommonModule,
    ModeloRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    DialogModule,
    ButtonModule
  ]
})
export class ModeloModule { }
