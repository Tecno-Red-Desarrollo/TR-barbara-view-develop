import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from 'src/services/api.service';
import { NotificationService } from 'src/services/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';

import { RepositorioService } from 'src/services/repositorio.service';
import { InspeccionesService } from 'src/app/inspecciones/inspecciones-service.service';
import { ModeloService } from 'src/services/modelo.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SpinnerService } from 'src/services/spinner.service';
import { BlockUIModule } from 'primeng/blockui';
import { StorageService } from 'src/services/storage.service';
import { MarcaService } from 'src/services/marca.service';
import { TallerService } from 'src/services/taller.service';
import { DropdownService } from 'src/services/dropdown.service';
import { LugarService } from 'src/services/lugar.service';
import { CodigoPostalService } from 'src/services/codigoPostal.service';
import { UsuarioService } from 'src/services/usuario.service';
import { ConfigFotoService } from 'src/services/configFoto.service';
import { RetrievalService } from 'src/services/retrieval.service';

import { MenubarModule } from 'primeng/menubar';
import { MenubarComponent } from './menubar/menubar.component';
import { LayoutBarbaraComponent } from './layout-barbara/layout-barbara.component';
import { AseguradoraService } from 'src/services/aseguradora.service';
import { BrbVisionService } from 'src/services/brbVision.service';


@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    MenubarComponent,
    LayoutBarbaraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastModule,
    BlockUIModule,
    MenubarModule,
  ],
  providers: [
    ApiService,
    RepositorioService,
    InspeccionesService,
    ModeloService,
    NotificationService,
    MessageService,
    SpinnerService,
    ConfirmationService,
    StorageService,
    MarcaService,
    TallerService,
    DropdownService,
    LugarService,
    UsuarioService,
    CodigoPostalService,
    RetrievalService,
    ConfigFotoService,
    AseguradoraService,
    BrbVisionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
