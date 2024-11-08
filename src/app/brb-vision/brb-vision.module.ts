import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
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
import {InputTextareaModule} from 'primeng/inputtextarea';
import { BrbVisionComponent } from './brb-vision.component';
import {BrbVisionRoutingModule} from "./brb-vision-routing.module";



@NgModule({
  declarations: [
    BrbVisionComponent
  ],
  imports: [
    CommonModule,
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
    BrbVisionRoutingModule
  ]
})
export class BrbVisionModule { }
