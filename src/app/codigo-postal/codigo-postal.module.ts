import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';

import { CodigoPostalRoutingModule } from './codigo-postal-routing.module';
import { CodigoPostalComponent } from './codigo-postal.component';

@NgModule({
  declarations: [
    CodigoPostalComponent
  ],
  imports: [
    CommonModule,
    CodigoPostalRoutingModule,
    TableModule,
    FormsModule, ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    ToolbarModule
  ]
})
export class CodigoPostalModule { }
