import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';

import { RepositorioRoutingModule } from './repositorio-routing.module';
import { RepositorioComponent } from './repositorio/repositorio.component';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RepositorioHelpers } from './helpers';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InspectionReportDialogComponent } from './inspection-report-dialog/inspection-report-dialog.component';
import { InformeInspeccionModule } from '../inspecciones/informe-inspeccion/informe-inspeccion.module';

@NgModule({
  declarations: [
    RepositorioComponent,
    InspectionReportDialogComponent,
  ],
  imports: [
    CommonModule,
    RepositorioRoutingModule,
    TooltipModule,
    BadgeModule,
    TableModule,
    ButtonModule,
    ContextMenuModule,
    TagModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    ConfirmDialogModule,
    SidebarModule,
    DialogModule,
    KeyFilterModule,
    InputTextareaModule,
    CheckboxModule,
    DividerModule,
    DynamicDialogModule,
    InformeInspeccionModule
  ],
  providers: [DatePipe, RepositorioHelpers]
})
export class RepositorioModule { }
