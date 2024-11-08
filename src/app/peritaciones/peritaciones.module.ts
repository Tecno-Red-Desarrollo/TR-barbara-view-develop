import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PeritacionesComponent } from './components/peritaciones/peritaciones.component';

import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

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
import { DividerModule } from 'primeng/divider';
import { PeritacionesRoutingModule } from './peritaciones-routing.module';
import { PeritacionesHelper } from './peritaciones-helper';
import { PeritacionesService } from './services/peritaciones.service';
import { NuevaPeritacionComponent } from './components/nueva-peritacion/nueva-peritacion.component';
import { AntecedentesService } from './services/antecedentes.service';

@NgModule({
  declarations: [
    PeritacionesComponent,
    NuevaPeritacionComponent
  ],
  imports: [
    CommonModule,
    PeritacionesRoutingModule,
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
    DividerModule
  ],
  providers: [DatePipe, PeritacionesHelper, PeritacionesService, AntecedentesService]
})
export class PeritacionesModule { }
