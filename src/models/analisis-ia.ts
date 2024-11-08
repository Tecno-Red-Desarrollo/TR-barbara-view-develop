import {DatePipe} from '@angular/common';

export class AnalisisIA {

  idBarbara: number;
  fechaAnalisis: string;
  aseguradora: string;
  dominioAseguradora: string;
  dominioIATrdDelantera: string;
  dominioIATrdTrasera: string;
  dominioIAQR: string;
  dominioIAOCR: string;
  tipoVehiculoAseguradora: string;
  tipoVehiculoIATrdDelantera: string;
  tipoVehiculoIATrdTrasera: string;
  marcaAseguradora: string;
  marcaIADelantera: string;
  marcaIATrasera: string;
  marcaIAOCR: string;
  modeloAseguradora: string;
  modeloIADelantera: string;
  modeloIATrasera: string;
  modeloIAOCR: string;
  chasisAseguradora: string;
  chasisIAQR: string;
  chasisIAOCR: string;
  poseeGNC: any;
  gncIA: any;
  poseeAuxilio: any;
  auxilioIA: any;
  estado: string;


  constructor(idBarbara: number, fechaAnalisis: string, aseguradora: string, dominioAseguradora: string,
              dominioIATrdDelantera: string, dominioIATrdTrasera: string, dominioIAQR: string,
              dominioIAOCR: string, tipoVehiculoAseguradora: string,
              tipoVehiculoIATrdDelantera: string, tipoVehiculoIATrdTrasera: string, marcaAseguradora: string,
              marcaIADelantera: string, marcaIAOCR: string, marcaIATrasera: string,
              modeloAseguradora: string, modeloIADelantera: string, modeloIATrasera: string,
              modeloIAOCR: string, chasisAseguradora: string,
              chasisIAQR: string, chasisIAOCR: string, estado: string, poseeGNC: any, gncIA: any,poseeAuxilio: any, auxilioIA: any
  ) {
    this.idBarbara = idBarbara;
    this.fechaAnalisis = fechaAnalisis;
    this.aseguradora = aseguradora;
    this.dominioAseguradora = dominioAseguradora;
    this.dominioIATrdDelantera = dominioIATrdDelantera;
    this.dominioIATrdTrasera = dominioIATrdTrasera;
    this.dominioIAQR = dominioIAQR;
    this.dominioIAOCR = dominioIAOCR;
    this.tipoVehiculoAseguradora = tipoVehiculoAseguradora;
    this.tipoVehiculoIATrdDelantera = tipoVehiculoIATrdDelantera;
    this.tipoVehiculoIATrdTrasera = tipoVehiculoIATrdTrasera;
    this.marcaAseguradora = marcaAseguradora;
    this.marcaIADelantera = marcaIADelantera;
    this.marcaIATrasera = marcaIATrasera;
    this.marcaIAOCR = marcaIAOCR;
    this.modeloAseguradora = modeloAseguradora;
    this.modeloIADelantera = modeloIADelantera;
    this.modeloIATrasera = modeloIATrasera;
    this.modeloIAOCR = modeloIAOCR;
    this.chasisAseguradora = chasisAseguradora;
    this.chasisIAQR = chasisIAQR;
    this.chasisIAOCR = chasisIAOCR;
    this.poseeGNC = poseeGNC;
    this.gncIA = gncIA;
    this.poseeAuxilio = poseeAuxilio;
    this.auxilioIA = auxilioIA;
    this.estado = estado;
  }

}
