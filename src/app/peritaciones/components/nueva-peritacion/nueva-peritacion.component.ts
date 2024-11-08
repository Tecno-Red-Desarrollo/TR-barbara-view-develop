import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AntecedentesService } from '../../services/antecedentes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { PeritacionesService } from '../../services/peritaciones.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nueva-peritacion',
  templateUrl: './nueva-peritacion.component.html',
  styleUrls: ['./nueva-peritacion.component.css']
})
export class NuevaPeritacionComponent {
  dominioAntecedente: FormControl<string> = new FormControl();

  findHistoryForm = new FormGroup({ dominio: this.dominioAntecedente });

  dominio: FormControl<string | null> = new FormControl('', [Validators.required]);
  apellido: FormControl<string | null> = new FormControl('', [Validators.required]);
  nombre: FormControl<string | null> = new FormControl('', [Validators.required]);
  email: FormControl<string | null> = new FormControl('', [Validators.required]);
  celular: FormControl<string | null> = new FormControl();
  nro_siniestro: FormControl<string | null> = new FormControl('', [Validators.required]);

  newApprasialForm = new FormGroup({
    dominio: this.dominio,
    apellido: this.apellido,
    nombre: this.nombre,
    email: this.email,
    celular: this.celular,
    nro_siniestro: this.nro_siniestro
  });

  history: any[] = [];

  selectedAntecedente: any = null;
  @ViewChild('autoperitacionAsegurado') autoperitacionAsegurado: ElementRef;
  @Output('onApprasialAdded') apprasialAdded = new EventEmitter<any>();

  constructor(
    private antecedentesService: AntecedentesService,
    private storageService: StorageService,
    private peritacionesService: PeritacionesService,
    private messageService: MessageService
  ) { }

  onFindHistoryFormSubmit() {
    this.findHistoryByPlate(this.dominioAntecedente.value)
  }

  onNewApprasialFormSubmit() {
    const newPeritacion: any = {
      usuario: this.storageService.getUserId(),
      aseguradora: 11,
      antecedente_id: this.selectedAntecedente?.id || null,
      dominio: null,
      nombre: null,
      apellido: null,
      email: null,
      celular: null,
      codigoCompania: '123213',
      codInfoauto: this.selectedAntecedente?.InspeccionVarios?.infoauto || '180296',
      modelo: this.selectedAntecedente?.modelo || 'KA 1.6',
      marca: this.selectedAntecedente?.marca || 'FORD',
      anio: this.selectedAntecedente?.anio || '2018',
      provincia: 'BUENOS AIRES',
      localidad: 'LANUS',
      cp: '1824',
    }
    newPeritacion.dominio = this.dominio.value;
    newPeritacion.apellido = this.apellido.value;
    newPeritacion.nombre = this.nombre.value;
    newPeritacion.email = this.email.value;
    newPeritacion.celular = this.celular.value;

    this.addNewApprasialRequest(newPeritacion)
  }

  findHistoryByPlate(plate: string) {
    this.antecedentesService.findHistoryByPLate(plate).subscribe((res: any) => {
      if (res) {
        this.history = res;
      }
    })
  }

  linkInspectionToApprasial() {

    this.dominio.setValue(this.selectedAntecedente.dominio)
    this.apellido.setValue(this.selectedAntecedente.InspeccionVarios?.titular_apellido)
    this.nombre.setValue(this.selectedAntecedente.InspeccionVarios?.titular_nombre)
    this.email.setValue(this.selectedAntecedente.InspeccionVarios?.titular_email)

    const element = this.autoperitacionAsegurado.nativeElement.querySelector('#autoperitacionAseguradoForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  unlinkInspectionToApprasial() {

  }

  addNewApprasialRequest(newAprrasialRequest: any) {
    this.peritacionesService.addNewApprasial(newAprrasialRequest).subscribe((res: any) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Nueva peritación', detail: 'La peritación fue solicitada' });
        this.apprasialAdded.emit(true);
        this.history = [];
        this.selectedAntecedente = null;
        this.findHistoryForm.reset()
        this.newApprasialForm.reset()
      }
    })
  }


}
