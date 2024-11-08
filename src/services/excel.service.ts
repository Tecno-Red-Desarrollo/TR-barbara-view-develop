import { Injectable } from "@angular/core";
import * as xlsx from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExcelService {
    constructor() {

    }

    exportExcel(data: any, sheetName: string) {
        const worksheet = xlsx.utils.json_to_sheet(this.populateDate(data));
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        return this.saveAsExcelFile(excelBuffer, sheetName);
    }

    populateDate(data : any){
      let result = [];
      for (var item of data) {
        if(item.fecha) item.fecha = new Date(item.fecha);
        if(item.fecha_auditado) item.fecha_auditado = new Date(item.fecha_auditado);
        if(item.fecha_inspeccion) item.fecha_inspeccion = new Date(item.fecha_inspeccion);
        result.push(item);
      }
      return result;
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        return FileSaver.saveAs(data, fileName + '_descarga_' + Date.now() + EXCEL_EXTENSION);
    }
}
