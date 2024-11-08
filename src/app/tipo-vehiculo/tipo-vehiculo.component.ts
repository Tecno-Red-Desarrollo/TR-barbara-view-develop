import { Component, OnInit , ViewChild} from '@angular/core';
import {TipoVehiculo} from "../../models/tipo-vehiculo";
import {TipoVehiculoService} from "../../services/tipoVechiculo.service";
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TipoVehiculoComponent implements OnInit {

  userId = -1;

  tiposVehiculo: TipoVehiculo[] = [];


  loading: boolean = false;

  totalRecords: number = 0;

  dialog: boolean = false;
  addOrUpdate: string = '';

  submitted = false;

  tipoVehiculo = {
    id: 0,
    nombre: "",
    nombreInfoAuto: ""
  }


  constructor(private tipoVehiculoService: TipoVehiculoService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getTiposVechiculo();
  }


  getTiposVechiculo() {
    // this.modeloService.getModelos({}).subscribe(res => {
    let tiposVehiculo = [
      {id: 5000, nombre: "AUTOMOVIL 4/5 P", nombreInfoAuto: "AUTOMOVIL 4/5 PUERTAS"},
      {id: 50001, nombre: "PICK-UP CABINA", nombreInfoAuto: "PICK-UP CABINA SIMPLE"},
      {id: 50003, nombre: "AUTOMOVIL COUPE 2/3 P", nombreInfoAuto: "AUTOMOVIL COUPE 2/3 P"},
      {id: 50004, nombre: "ACOPLADO", nombreInfoAuto: "ACOPLADO"},

    ];

    this.tiposVehiculo = tiposVehiculo;

  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  delete(tipoVehiculo: TipoVehiculo) {

    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar ' + tipoVehiculo.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tiposVehiculo = this.tiposVehiculo.filter(val => val.id !== tipoVehiculo.id);
        this.tipoVehiculo = {
          id: 0,
          nombre: "",
          nombreInfoAuto: "",
        }
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Tipo de Vehiculo eliminado', life: 3000});
      }
    });

  }

  edit(tipoVehiculo: TipoVehiculo) {

    this.tipoVehiculo = {...tipoVehiculo};
    this.dialog = true;
    this.addOrUpdate = "EDITAR";
  }


  newTipoVehiculo() {

    this.tipoVehiculo = new TipoVehiculo();
    this.addOrUpdate = "NUEVO";
    this.submitted = false;
    this.dialog = true;
  }

  save(tipoVehiculo: TipoVehiculo) {
    if (tipoVehiculo.id > 0) {
      this.update(tipoVehiculo);
    } else {
      this.add(tipoVehiculo);
    }
  }


  add(tipoVehiculo: TipoVehiculo) {

    this.submitted = true;

    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Tipo de vehiculo Creado', life: 3000});
    this.tiposVehiculo = [...this.tiposVehiculo];
    this.dialog = false;
    this.getTiposVechiculo();

  }

  update(tipoVehiculo: TipoVehiculo) {
    this.submitted = true;

    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Tipo de vehiculo actualizado', life: 3000});
    this.tiposVehiculo = [...this.tiposVehiculo];
    this.dialog = false;
    this.getTiposVechiculo();

  }


  public unique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  }


}
