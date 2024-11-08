import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviasAltaRepositorioComponent } from './previas-alta-repositorio.component';
import { PreviasAltaRepositorioRoutingModule } from './previas-alta-repositorio-routing.module';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import {FileUploadModule} from 'primeng/fileupload';



@NgModule({
  declarations: [
    PreviasAltaRepositorioComponent,

  ],
  imports: [
    CommonModule,
    PreviasAltaRepositorioRoutingModule,
    ToastModule,
    ToolbarModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule,
    ButtonModule,
    CardModule,
    InputTextareaModule,
    MultiSelectModule,
    CascadeSelectModule,
    FileUploadModule
  ]
})
export class PreviasAltaRepositorioModule { }
