import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadosRoutingModule } from './estados-routing.module';
import { EstadosComponent } from './estados.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    EstadosComponent
  ],
  imports: [
    CommonModule,
    EstadosRoutingModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ConfirmDialogModule,
    InputSwitchModule,
    InputTextareaModule
  ]
})
export class EstadosModule { }
