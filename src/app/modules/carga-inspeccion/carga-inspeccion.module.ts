import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { WebcamModule } from 'ngx-webcam';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlockUIModule } from 'primeng/blockui';

import { CargaInspeccionRoutingModule } from './carga-inspeccion-routing.module';
import { LayoutCargaInspeccionComponent } from './layout-carga-inspeccion/layout-carga-inspeccion.component';
import { InicioAutomotorComponent } from './automotor/inicio-automotor/inicio-automotor.component';
import { ConsideracionesAutomotorComponent } from './automotor/consideraciones-automotor/consideraciones-automotor.component';
import { VerificacionAutomotorComponent } from './automotor/verificacion-automotor/verificacion-automotor.component';
import { InicioCombinadoFamiliarComponent } from './combinado-familiar/inicio-combinado-familiar/inicio-combinado-familiar.component';
import { ConsideracionesCombinadoFamiliarComponent } from './combinado-familiar/consideraciones-combinado-familiar/consideraciones-combinado-familiar.component';
import { VerificacionCombinadoFamiliarComponent } from './combinado-familiar/verificacion-combinado-familiar/verificacion-combinado-familiar.component';
import { InicioAutomotorZurichComponent } from './automotor-zurich/inicio-automotor-zurich/inicio-automotor-zurich.component';
import { FotosZurichComponent } from './automotor-zurich/fotos-zurich/fotos-zurich.component';
import { FinalizacionAutomotorZurichComponent } from './automotor-zurich/finalizacion-automotor-zurich/finalizacion-automotor-zurich.component';
import { DocumentosZurichComponent } from './automotor-zurich/documentos-zurich/documentos-zurich.component';
import { DetallesAutomotorZurichComponent } from './automotor-zurich/detalles-automotor-zurich/detalles-automotor-zurich.component';
import { ConsideracionesAutomotorZurichComponent } from './automotor-zurich/consideraciones-automotor-zurich/consideraciones-automotor-zurich.component';
import { VerificacionAutomotorZurichComponent } from './automotor-zurich/verificacion-automotor-zurich/verificacion-automotor-zurich.component';
import { DetallesAutomotorComponent } from './automotor/detalles-automotor/detalles-automotor.component';
import { FotosComponent } from './automotor/fotos/fotos.component';
import { FinalizacionAutomotorComponent } from './automotor/finalizacion-automotor/finalizacion-automotor.component';
import { DocumentosComponent } from './automotor/documentos/documentos.component';
import { StepsZurichComponent } from './automotor-zurich/steps-zurich/steps-zurich.component';
import { WindowRef } from '../../../services/window.service';
import { StepsPresencialService } from './automotor-zurich/services/stepsPresencial.service';

import { CamaraComponent } from './automotor/fotos/camara/camara.component';
import { CamaraZurichComponent } from './automotor-zurich/camara-zurich/camara-zurich.component';
import { ErrorInspeccionComponent } from './error-inspeccion/error-inspeccion.component';
import { ConfirmarUbicacionComponent } from './automotor-zurich/inspeccion-presencial/confirmar-ubicacion/confirmar-ubicacion.component';
import { ElegirLugarComponent } from './automotor-zurich/inspeccion-presencial/elegir-lugar/elegir-lugar.component';
import { AgendarComponent } from './automotor-zurich/inspeccion-presencial/agendar/agendar.component';
import { StepsPresencialComponent } from './automotor-zurich/inspeccion-presencial/steps-presencial/steps-presencial.component';
import { AgendarCentroComponent } from './automotor-zurich/inspeccion-presencial/agendar-centro/agendar-centro.component';
import { AgendarDomicilioComponent } from './automotor-zurich/inspeccion-presencial/agendar-domicilio/agendar-domicilio.component';
import { SafePipe } from 'src/app/pipes/safeUrl.pipe';
import { InicioProductorZurichComponent } from './automotor-zurich/inicio-productor-zurich/inicio-productor-zurich.component';
import { ReenvioAseguradoProductorZurichComponent } from './automotor-zurich/reenvio-asegurado-productor-zurich/reenvio-asegurado-productor-zurich.component';
import { FinalizacionProductorZurichComponent } from './automotor-zurich/finalizacion-productor-zurich/finalizacion-productor-zurich.component';
import { HeaderZurichComponent } from './automotor-zurich/shared-components/header-zurich/header-zurich.component';

import { ImageParamsStorageService } from './automotor-zurich/services/imageParams-storage.service';
import { InspeccionStorageService } from './automotor-zurich/services/inspeccion-storage.service';
import { SendMessagesService } from './automotor-zurich/services/send-messages.service';
import { ScoresService } from './automotor-zurich/services/scores.service';
import { UserInspectorService } from './automotor-zurich/services/user-inspector.service';
import { StepsDigitalService } from './automotor-zurich/services/stepsDigital.service';

@NgModule({
  declarations: [
    LayoutCargaInspeccionComponent,
    ErrorInspeccionComponent,
    //GENÉRICO
    InicioAutomotorComponent,
    ConsideracionesAutomotorComponent,
    VerificacionAutomotorComponent,
    DetallesAutomotorComponent,
    FotosComponent,
    DocumentosComponent,
    FinalizacionAutomotorComponent,

    //COMBINADO FAMILIAR
    InicioCombinadoFamiliarComponent,
    ConsideracionesCombinadoFamiliarComponent,
    VerificacionCombinadoFamiliarComponent,

    //ZURICH
    InicioAutomotorZurichComponent,
    FotosZurichComponent,
    CamaraZurichComponent,
    FinalizacionAutomotorZurichComponent,
    DocumentosZurichComponent,
    DetallesAutomotorZurichComponent,
    ConsideracionesAutomotorZurichComponent,
    VerificacionAutomotorZurichComponent,
    ConfirmarUbicacionComponent,
    ElegirLugarComponent,
    AgendarComponent,
    StepsPresencialComponent,
    AgendarCentroComponent,
    AgendarDomicilioComponent,
    SafePipe,
    StepsZurichComponent,
    InicioProductorZurichComponent,
    ReenvioAseguradoProductorZurichComponent,
    FinalizacionProductorZurichComponent,
    HeaderZurichComponent,
    CamaraComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    CargaInspeccionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    StepsModule,
    CardModule,
    FileUploadModule,
    WebcamModule,
    ImageModule,
    HttpClientModule,
    DialogModule,
    ProgressSpinnerModule,
    RatingModule,
    ToggleButtonModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    ConfirmDialogModule,
    BlockUIModule
  ],
  providers: [
    InspeccionStorageService,
    ImageParamsStorageService,
    WindowRef,
    StepsDigitalService,
    StepsPresencialService,
    SendMessagesService,
    ScoresService,
    UserInspectorService
  ],
})
export class CargaInspeccionModule { }
