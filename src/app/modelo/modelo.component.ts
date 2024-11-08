import {Component, OnInit, ViewChild} from '@angular/core';
import {Modelo} from "../../models/modelo";
import {ModeloService} from "../../services/modelo.service";
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';



@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ModeloComponent implements OnInit {

  userId = -1;

  modelos: Modelo[] = [];


  loading: boolean = false;

  totalRecords: number = 0;

  dialog: boolean = false;
  addOrUpdate: string = '';

  submitted = false;

  modelo = {
    id: 0,
    nombre: "",
    marca: "",
    tipoVehiculo: "",
    nombreInfoauto: "",
    precio: 0
  }


  constructor(private modeloService: ModeloService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getModelos();
  }


  getModelos(){

    this.modeloService.getModelos(event).subscribe((res: any) => {
      if (res) {
        this.totalRecords = res.count;
        this.modelos = res.rows;
      }
      this.loading = false;
    });

  }
  // getModelos() {
  //   // this.modeloService.getModelos({}).subscribe(res => {
  //   let modedos = [
  //     {id: 5000, nombre: "FIESTA", marca: "FORD", nombreInfoauto: "FIESTA KDE", precio: 500000},
  //     {id: 50001, nombre: "FOCUS", marca: "FORD", nombreInfoauto: "FOCUS XD", precio: 600000},
  //     {id: 50002, nombre: "FIESTA KINECTIC", marca: "FORD", nombreInfoauto: "FIESTA SE PLUS", precio: 600000},
  //     {id: 50003, nombre: "CHRONOS", marca: "FIAT", nombreInfoauto: "CHRONOS --", precio: 800000},
  //     {id: 50004, nombre: "PUNTO", marca: "FIAT", nombreInfoauto: "PUNTO ASD", precio: 500000},
  //     {id: 50005, nombre: "FOCUS", marca: "FORD", nombreInfoauto: "FOCUS XD", precio: 600000},
  //     {id: 50006, nombre: "CLASSIC", marca: "CHEVROLET", nombreInfoauto: "CLASSIC RTY", precio: 500000},
  //     {id: 50007, nombre: "ONIX", marca: "CHEVROLET", nombreInfoauto: "ONIX SRV", precio: 600000},
  //     {id: 50008, nombre: "CIVIC", marca: "HONDA", nombreInfoauto: "CIVIC", precio: 500000},
  //     {id: 50009, nombre: "HR-V", marca: "HONDA", nombreInfoauto: "HR-V GFR", precio: 600000},
  //     {id: 500010, nombre: "COROLLA", marca: "TOYOTA", nombreInfoauto: "COROLLA", precio: 500000},
  //     {id: 500011, nombre: "208", marca: "PEUGEOT", nombreInfoauto: "208 RTX", precio: 600000},
  //     {id: 500012, nombre: "308", marca: "PEUGEOT", nombreInfoauto: "308 TXD", precio: 500000},
  //     {id: 500013, nombre: "SPRINTER", marca: "MERCEDES-BENZ", nombreInfoauto: "SPRINTER FG4", precio: 1600000},
  //     {id: 500014, nombre: "CLASE E", marca: "MERCEDES-BENZ", nombreInfoauto: "CLASE E SDF", precio: 500000},
  //     {id: 500015, nombre: "GOL TREND", marca: "VW", nombreInfoauto: "GOL TREND XS", precio: 600000},
  //     {id: 500016, nombre: "GOL", marca: "VW", nombreInfoauto: "GOLF XL", precio: 500000},
  //     {id: 500017, nombre: "SURAN", marca: "VW", nombreInfoauto: "SURAN DF", precio: 600000},
  //   ];
  //
  //   this.modelos = modedos;
  //
  //
  //   //
  //   //   if (res) {
  //   //     this.modelos = res;
  //   //   }
  //   // });
  // }


  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  delete(modelo: Modelo) {

    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar ' + modelo.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modelos = this.modelos.filter(val => val.id !== modelo.id);
        this.modelo = {
          id: 0,
          nombre: "",
          marca: "",
          tipoVehiculo: "",
          nombreInfoauto: "",
          precio: 0
        }
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Modelo eliminado', life: 3000});
      }
    });

  }

  edit(modelo: Modelo) {

    this.modelo = {...modelo};
    this.dialog = true;
    this.addOrUpdate = "EDITAR";
  }


  newModelo() {

    this.modelo = new Modelo();
    this.addOrUpdate = "NUEVO";
    this.submitted = false;
    this.dialog = true;
  }

  save(modelo: Modelo) {
    if (modelo.id > 0) {
      this.update(modelo);
    } else {
      this.add(modelo);
    }
  }


  add(modelo: Modelo) {

    this.submitted = true;

    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Modelo Creado', life: 3000});
    this.modelos = [...this.modelos];
    this.dialog = false;
    this.getModelos();

  }

  update(modelo: Modelo) {
    this.submitted = true;

    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Modelo actualizado', life: 3000});
    this.modelos = [...this.modelos];
    this.dialog = false;
    this.getModelos();

  }


  public unique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  }

}
