import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

import { TalleresRoutingModule } from './talleres-routing.module';
import { TalleresComponent } from './talleres.component';

@NgModule({
  declarations: [
    TalleresComponent
  ],
  imports: [
    CommonModule,
    TalleresRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    TagModule
  ]
})
export class TalleresModule { }
