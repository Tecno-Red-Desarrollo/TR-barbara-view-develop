import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProvinciasRoutingModule } from './provincias-routing.module';
import { ProvinciasComponent } from './provincias.component';

import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [ProvinciasComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ProvinciasRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class ProvinciasModule { }
