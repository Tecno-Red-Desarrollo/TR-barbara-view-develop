import { Component, OnInit } from '@angular/core';
import { Infoauto } from 'src/models/infoauto';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-infoauto',
  templateUrl: './infoauto.component.html',
  styleUrls: ['./infoauto.component.css']
})
export class InfoautoComponent implements OnInit {

  userId = -1;

  infoauto: Infoauto[];
  marcas: any = [];
  modelos: any = [];

  marca = '';
  modelo = '';
  anio: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.getMarcas();
    this.getInfoAuto();
  }

  getInfoAuto() {
    this.apiService.getInfoAuto({}).subscribe((res: any) => {
      if (res) {
        this.infoauto = res;
      }
    },(error : any)  =>{
      alert("fail2 "+ error.message);
    });
  }

  getMarcas() {
    this.apiService.getMarcas().subscribe(res => {
      if (res && res.marcas) {
        this.marcas = res.marcas;
      }
    });
  }

  onChangeMarca(select: any) {
    this.apiService.getInfoAuto({ marca: String(select.value).toUpperCase() }).subscribe(res => {
      if (res) {
        this.modelos = res.map((m: any) => {
          return String(m.modelo).toUpperCase();
        }).filter(this.unique).sort();
        this.infoauto = res;
      }
    });
  }

  onChangeMarcaModeloAnio() {
    this.apiService.getInfoAuto({ marca: this.marca, modelo: this.modelo, anio: this.anio }).subscribe(res => {
      if (res) {
        console.log(res)
        this.modelos = res.map((m: any) => {
          return String(m.modelo).toUpperCase();
        }).filter(this.unique).sort();
      }
    });

  }

  deleteInfoAuto(infoauto: Infoauto) {

    let _ia = new Infoauto();
    _ia.id = infoauto.id;

  }

  editInfoAuto(infoauto: Infoauto) {

    let _ia = new Infoauto();
    _ia.id = infoauto.id;
    _ia.marca = infoauto.marca;
    _ia.modelo = infoauto.modelo;
    _ia.modelo_tecno = infoauto.modelo_tecno;
    _ia.tv = infoauto.tv;
    _ia.precio = infoauto.precio;
    _ia.codigo = infoauto.codigo;
    _ia.anio = infoauto.anio;

    let title = "Editar";


  }

  newInfoAuto() {

    let _ia = new Infoauto();
    let title = "Nuevo";


  }


  public unique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  }

}
