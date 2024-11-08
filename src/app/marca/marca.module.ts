import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcaComponent } from './marca.component';
import { MarcaRoutingModule } from './marca-routing.module';



@NgModule({
  declarations: [
    MarcaComponent,

  ],
  imports: [
    CommonModule,
    MarcaRoutingModule,
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
    ButtonModule,

  ]
})
export class MarcaModule { }
