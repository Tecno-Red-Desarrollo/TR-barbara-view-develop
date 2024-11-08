import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from "../../models/marca";
import { MarcaService } from "../../services/marca.service";
import { ConfirmationService, SelectItem } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

 @ViewChild('tablaMarca') tablaMarca: Table;

  userId = -1;

  marcas: Marca[] = [];

  loading: boolean = false;

  totalRecords: number = 0;

  marcaDialog: boolean = false;
  addOrUpdate: string = '';

  submitted = false;



  marca = {
    id: 0,
    nombre: "",
    nombreInfoauto: "",
  }

  matchModeOptions: SelectItem[];

  constructor(private marcaService: MarcaService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.matchModeOptions = [

    ];
  }

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas() {
    let marca = [
      {id: 1, nombre: "AUDI", nombreInfoauto: "AUDI INFOAUTO"},
      {id: 2, nombre: "BMW", nombreInfoauto: "BMW INFOAUTO"},
      {id: 3, nombre: "CHEVROLET", nombreInfoauto: "CHEVROLET INFOAUTO"},
      {id: 4, nombre: "CITROEN", nombreInfoauto: "CITROEN INFOAUTO" },
      {id: 5, nombre: "FIAT", nombreInfoauto: "FIAT INFOAUTO"},
      {id: 6, nombre: "FORD",  nombreInfoauto: "FORD INFOAUTO"},
      {id: 7, nombre: "HONDA",  nombreInfoauto: "HONDA INFOAUTO"},
      {id: 8, nombre: "HYUNDAI",  nombreInfoauto: "HYUNDAI INFOAUTO"},
      {id: 9, nombre: "PEUGEOT", nombreInfoauto: "PEUGEOT INFOAUTO"},
      {id: 10, nombre: "RENAULT", nombreInfoauto: "RENAULT INFOAUTO"},
      {id: 11, nombre: "TOYOTA",nombreInfoauto: "TOYOTA INFOAUTO"},
      {id: 12, nombre: "VOLKSWAGEN", nombreInfoauto: "VOLKSWAGEN INFOAUTO"},
    ];

    this.marcas = marca;
  }

  hideDialog() {
    this.marcaDialog = false;
    this.submitted = false;
  }

  delete(marca: Marca) {
    this.confirmationService.confirm({
      message: 'Está seguro que desea eliminar ' + marca.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.marcas = this.marcas.filter(val => val.id !== marca.id);
        this.marca = {
          id: 0,
          nombre: "",
          nombreInfoauto: "",
        }
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Marca Eliminada', life: 3000});
      }
    });
  }

  edit(marca: Marca) {

    this.marca = {...marca};
    this.marcaDialog = true;
    this.addOrUpdate = "Editar";
  }


  newMarca() {

    this.marca = new Marca();
    this.addOrUpdate = "Nuevo";
    this.submitted = false;
    this.marcaDialog = true;
  }

  saveMarca(marca: Marca) {
    if (marca.id > 0) {
      this.update(marca);
    } else {
      //this.marcas.push(this.marca);
      this.add(marca);
    }
  }


  add(marca: Marca) {
    this.submitted = true;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Marca Agregada', life: 3000});
    this.marcas = [...this.marcas];
    this.marcaDialog = false;
    this.getMarcas();

  }

  update(marca: Marca) {
    this.submitted = true;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Marca Actualizada', life: 3000});
    this.marcas = [...this.marcas];
    this.marcaDialog = false;
    this.getMarcas();

  }

  setFilter(v: any, filter: string, matchMode: string = 'contains') {

    let filterValue = v || null;
    if (filterValue && typeof filterValue == 'object' && filterValue.length == 0) filterValue = null;

    if (filterValue) {
      this.tablaMarca.filters[filter] = { value: filterValue, matchMode: matchMode };
    } else {
      delete this.tablaMarca.filters[filter];
    }
  }


  public unique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  }

}
