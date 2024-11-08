import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from "primeng/table";
import { LazyLoadEvent } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { BrbVisionService } from "../../services/brbVision.service";
import { AnalisisIA } from "../../models/analisis-ia";
import { ApiService } from "../../services/api.service";
import { ExcelService } from 'src/services/excel.service';

@Component({
  selector: 'app-brb-vision',
  templateUrl: './brb-vision.component.html',
  styleUrls: ['./brb-vision.component.css']
})
export class BrbVisionComponent implements OnInit {

  @ViewChild('tablaBrbVision') tablaBrbVision: Table;

  analisisIA: AnalisisIA[] = [];

  //Filtros
  provincias: [] = [];
  aseguradoras: [] = [];
  estados: [] = [];
  tiposVehiculo: [] = [];

  dominio: string;
  codigo: string;
  chasis: string;
  provincia: string;
  fechaDesde: Date;
  fechaHasta: Date;

  loading: boolean;

  totalRecords: number;
  selectedRow: AnalisisIA;

  cols: any[];

  _selectedColumns: any[];

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private brbVisionService: BrbVisionService,
    private excelService: ExcelService) {
  }

  ngOnInit(): void {
    this.initColumns();
  }

  initColumns(): void {

    this.cols = [
      { field: 'idBarbara', header: 'ID BARBARA' },
      { field: 'fechaAnalisis', header: 'FECHA ANALISIS' },
      { field: 'aseguradora', header: 'ASEGURADORA' },
      { field: 'dominioAseguradora', header: 'DOMINIO ASEGURADORA' },
      { field: 'dominioIATrdTrasera', header: 'DOMINIO TRASERA PLATE RECOGNIZER' },
      { field: 'dominioIATrdDelantera', header: 'DOMINIO DELANTERA PLATE RECOGNIZER' },
      { field: 'dominioIAQR', header: 'DOMINIO QR' },
      { field: 'dominioIAOCR', header: 'DOMINIO OCR' },
      { field: 'tipoVehiculoAseguradora', header: 'TIPO VEHICULO ASEGURADORA' },
      { field: 'tipoVehiculoIATrdLateral', header: 'TIPO VEHICULO LATERAL BRBVISION' },
      { filed: 'tipoVehiculoIATrdTrasera', header: 'TIPO VEHICULO TRASERA BRBVISION' },
      { field: 'tipoVehiculoIATrdDelantera', header: 'TIPO VEHICULO DELANTERA BRBVISION' },
      { field: 'marcaAseguradora', header: 'MARCA ASEGURADORA' },
      { field: 'marcaIATrasera', header: 'MARCA TRASERA PLATE RECOGNIZER' },
      { field: 'marcaIADelantera', header: 'MARCA DELANTERA PLATE RECOGNIZER' },
      { field: 'marcaIAOCR', header: 'MARCA OCR' },
      { field: 'modeloAseguradora', header: 'MODELO ASEGURADORA' },
      { field: 'modeloIATrasera', header: 'MODELO TRASERA PLATE RECOGNIZER' },
      { field: 'modeloIAPRDelantera', header: 'MODELO DELANTERA PLATE RECOGNIZER' },
      { field: 'modeloIAOCR', header: 'MODELO OCR' },
      { field: 'chasisAseguradora', header: 'CHASIS ASEGURADORA' },
      { field: 'chasisIAQR', header: 'CHASIS QR' },
      { field: 'chasisIAOCR', header: 'CHASIS OCR' },
      { field: 'poseeGNC', header: 'GNC ASEGURADORA' },
      { field: 'gncIA', header: 'GNC BRBVISION' },
      { field: 'poseeAuxilio', header: 'AUXILIO ASEGURADORA' },
      { field: 'auxilioIA', header: 'AUXILIO BRBVISION' },

    ];
    this._selectedColumns = this.cols;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }


  lazyLoadTableRecords(event: LazyLoadEvent) {
    this.loading = true;
    this.brbVisionService.getBrbVision(event).subscribe((res: any) => {
      if (res) {
        this.totalRecords = res.count;
        this.analisisIA = res.rows;
      }
      this.loading = false;
      // this.spinnerService.hide();
    });
  }

  setFilter(v: any, filter: string, matchMode: string = 'contains') {

    let filterValue = v || null;
    if (filterValue && typeof filterValue == 'object' && filterValue.length == 0) filterValue = null;

    if (filterValue) {
      this.tablaBrbVision.filters[filter] = { value: filterValue, matchMode: matchMode };
    } else {
      delete this.tablaBrbVision.filters[filter];
    }

  }


  exportExcel() {
    let data = {
      filters: this.tablaBrbVision.filters,
      rows: this.totalRecords,

    }
    this.brbVisionService.getBrbVision(data).subscribe((res: any) => {
      if (res) {
        this.excelService.exportExcel(res.rows,'brb-vision')
      }
    });

  }


}

