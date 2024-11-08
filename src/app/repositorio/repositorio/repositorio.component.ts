import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Repositorio } from 'src/models/repositorio';
import { RepositorioService } from 'src/services/repositorio.service';
import { ApiService } from 'src/services/api.service';
import { LazyLoadEvent, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Provincia } from 'src/models/provincia';
import { ConfirmationService } from 'primeng/api';
import { SpinnerService } from 'src/services/spinner.service';
import { StorageService } from 'src/services/storage.service';
import { environment } from 'src/environments/environment';
import { RepositorioHelpers } from '../helpers';
import { UsuarioService } from 'src/services/usuario.service';
import { ExcelService } from 'src/services/excel.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InformeInspeccionComponent } from 'src/app/inspecciones/informe-inspeccion/informe-inspeccion/informe-inspeccion.component';

declare var moment: any;

//import { NgxSpinnerService } from "ngx-spinner";
declare var Fancybox: any;


@Component({
  providers: [DialogService],
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.css']
})
export class RepositorioComponent implements OnInit {

  @ViewChild('tablaRepo') tablaRepo: Table;

  repositorio: Repositorio[] = [];

  cols: any[] = [];
  cols_adm: any[];
  cols_default: any[];

  _selectedColumns: any[];

  not_toggle: any[];
  not_default: any[];
  sms_available: boolean = false;

  selectedRow: Repositorio = new Repositorio();
  enviarLinkDialog: boolean = false;
  linkAseguradoDialog: boolean = false;
  loadingEnviarLink: boolean = false;
  blockSpaceFilter: RegExp = /[^\s]/;

  //displayedColumns: string[] = ['verIp', 'fechaSolicitud', 'fechaInspeccion', 'dominio', 'aseguradoraNombre', 'asegurado', 'canal', 'email', 'productorEmail', 'estado', 'reinspeccion', 'cantAvisos', 'fechaUltimoReenvio', 'options'];
  contextMenuItems: MenuItem[] = [
    {
      id: '1',
      label: 'Enviar link del gestionador',
      icon: 'pi pi-fw pi-send',
      command: () => this.enviarLinkDialog = true,
      disabled: false
    },
    {
      id: '2',
      label: 'Obtener link del asegurado',
      icon: 'pi pi-fw pi-link',
      command: () => this.linkAseguradoDialog = true,
      disabled: false
    }
  ]

  // Filtros

  totalRecords: number;

  provincias: [] = [];
  aseguradoras: [] = [];
  aseguradoras_available = [];
  estados_available = [];
  estados: [] = [];
  canales: [] = [];
  estado?: any;
  selectedCanales: [] = [];
  selectedProvincias: [] = [];
  selectedAseguradoras: [] = [];

  dominio?: string;
  codigo?: string;
  chasis: string;
  provincia: string;
  reinspeccionada: boolean = false;

  _fecha = new Date();
  fechaDesde: Date = new Date(`${this._fecha.getFullYear()}-${this._fecha.getMonth()}-${this._fecha.getDate()}`);
  fechaHasta?: Date;

  loading: boolean;

  matchModeOptions: SelectItem[];
  url = environment.url;

  celularAsegurado: string | number = "";

  LIMITE_SMS: number = 3;
  reportDialogRef: DynamicDialogRef | undefined;
  reportDialogVisible = false;

  constructor(private repositorioService: RepositorioService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService,
    private usuarioService: UsuarioService,
    public helper: RepositorioHelpers,
    private excelService: ExcelService,
    public dialogService: DialogService
  ) {

    this.cols_default = [
      { id: 'ESTADO', header: 'ESTADO', field: 'estado', sort: '' },
      { id: 'REINSPECCION', header: '', field: 'reinspeccion', sort: '' },
      { id: 'VER_IP', header: '', field: 'ver_ip', sort: '' },
      { id: 'DOMINIO', header: 'DOMINIO', field: 'dominio', sort: 'dominio' },
      { id: 'FECHA_SOLICITUD', header: 'FECHA SOLICITUD', field: 'fecha_solicitud', sort: 'fecha_solicitud' },
      { id: 'FECHA_INSPECCION', header: 'FECHA INSPECCIÓN', field: 'fecha_inspeccion', sort: 'fecha_inspeccion' },
      { id: 'FECHA_AUDITADO', header: 'FECHA AUDITADO', field: 'fecha_auditado', sort: 'fecha_auditado' },
      { id: 'ASEGURADORA', header: 'ASEGURADORA', field: 'aseguradora', sort: '' },
      { id: 'ASEGURADO', header: 'ASEGURADO', field: 'asegurado', sort: '' },
      { id: 'CANAL', header: 'CANAL', field: 'canal', sort: '' },
      { id: 'ORGANIZADOR', header: 'ORGANIZADOR', field: 'organizador', sort: 'organizador' },
      { id: 'EMAIL', header: 'EMAIL', field: 'email', sort: '' },
      { id: 'PRODUCTOR_EMAIL', header: 'PRODUCTOR EMAIL', field: 'prod_email', sort: '' },
      { id: 'CANT_AVISOS', header: '', field: 'cant_avisos', sort: '' },
      { id: 'COBERTURA_SOLICITADA', header: 'COBERTURA SOLICITADA', field: 'cobertura_solicitada', sort: '' },
      { id: 'COBERTURA_OTORGADA', header: 'COBERTURA OTORGADA', field: 'cobertura' },
      { id: 'AUDITA', header: 'AUDITA', field: 'lo_audita' },
      { id: 'VER', header: 'VER', field: 'ver' },
      { id: 'GESTIONADOR_EMAIL', header: 'GESTIONADOR EMAIL', field: 'gestionador_email' },
    ];

    this.cols_adm = [
      { id: 'ESTADO', header: 'ESTADO', field: 'estado', sort: '' },
      { id: 'REINSPECCION', header: '', field: 'reinspeccion', sort: '' },
      { id: 'VER_IP', header: '', field: 'ver_ip', sort: '' },
      { id: 'DOMINIO', header: 'DOMINIO', field: 'dominio', sort: 'dominio' },
      { id: 'FECHA_SOLICITUD', header: 'FECHA SOLICITUD', field: 'fecha_solicitud', sort: 'fecha_solicitud' },
      { id: 'FECHA_INSPECCION', header: 'FECHA INSPECCIÓN', field: 'fecha_inspeccion', sort: 'fecha_inspeccion' },
      { id: 'FECHA_AUDITADO', header: 'FECHA AUDITADO', field: 'fecha_auditado', sort: 'fecha_auditado' },
      { id: 'ASEGURADORA', header: 'ASEGURADORA', field: 'aseguradora', sort: '' },
      { id: 'ASEGURADO', header: 'ASEGURADO', field: 'asegurado', sort: '' },
      { id: 'CANAL', header: 'CANAL', field: 'canal', sort: '' },
      { id: 'ORGANIZADOR', header: 'ORGANIZADOR', field: 'organizador', sort: 'organizador' },
      { id: 'EMAIL', header: 'EMAIL', field: 'email', sort: '' },
      { id: 'PRODUCTOR_EMAIL', header: 'PRODUCTOR EMAIL', field: 'prod_email', sort: '' },
      { id: 'CANT_AVISOS', header: '', field: 'cant_avisos', sort: '' },
      { id: 'COBERTURA_SOLICITADA', header: 'COBERTURA SOLICITADA', field: 'cobertura_solicitada', sort: '' },
      { id: 'COBERTURA_OTORGADA', header: 'COBERTURA OTORGADA', field: 'cobertura' },
      { id: 'AUDITA', header: 'AUDITA', field: 'lo_audita' },
      { id: 'VER_IN', header: 'VER IN', field: 'InspeccionOriginal.ver' },
      { id: 'VER', header: 'VER', field: 'ver' },
      { id: 'DANIO', header: 'DAÑOS', field: 'danio' },
      { id: 'TIEMPO', header: 'TIEMPO', field: 'tiempo' },
      { id: 'ERROR_FOTO', header: 'ERROR FOTO', field: 'error_foto' },
      { id: 'GESTIONADOR_EMAIL', header: 'GESTIONADOR EMAIL', field: 'gestionador_email' },
      { id: 'PRODUCTOR', header: 'PRODUCTOR', field: 'productor' },
      { id: 'DELEGACION', header: 'DELEGACION', field: 'delegacion' },
      { id: 'EJECUTIVO_CIA', header: 'EJECUTIVO CIA', field: 'ejecutivo_cia' },
      { id: 'ZONA_RIESGO', header: 'ZONA RIESGO', field: 'zona_riesgo' }
    ];

    this.not_toggle = ['ESTADO', 'ASEGURADORA', 'DOMINIO', 'REINSPECCION', 'CANT_AVISOS', 'VER_IP'];
    this.not_default = ['PRODUCTOR_EMAIL', 'EMAIL', 'ORGANIZADOR', 'FECHA_AUDITADO', 'AUDITA', 'VER_IN', 'VER', 'DANIO', 'TIEMPO', 'ERROR_FOTO', 'GESTIONADOR_EMAIL', 'PRODUCTOR', 'DELEGACION', 'EJECUTIVO_CIA', 'ZONA_RIESGO'];

  }

  ngOnInit(): void {

    this.usuarioService.getDetailById(this.storageService.getUserId()).subscribe((res: any) => {
      if (res) {
        this.storageService.setUser(res);
        this.aseguradoras_available = this.storageService.getAseguradoras();

        // Consultamos las provincias para el filtro
        this.apiService.getProvincias().subscribe((res: any) => {
          if (res) {
            this.provincias = res;
          }
        });

        // Consultamos las aseguradoras para el filtro
        this.apiService.getAseguradoras().subscribe((res: any) => {
          if (res) {
            this.aseguradoras = res;
          }
        });

        this.repositorioService.getEstados().subscribe((res: any) => {
          if (res) {
            res.push({ id: 90, nombre: 'Link enviado', enombre: 'Link enviado' });
            res.push({ id: 99, nombre: 'Vencida', enombre: 'Vencida' });
            this.estados = res;
          }
        });

        this.apiService.getCanales().subscribe((res: any) => {
          if (res) {
            this.canales = res;
          }
        });


        if ((this.storageService.getAseguradoras().length == 1 && this.storageService.getAseguradoras()[0] == 21) || (this.storageService.user && this.storageService.user.rol_id == 4)) {
          this.cols = this.cols_adm;
          this.contextMenuItems.push({
            id: '3',
            label: 'Anular pedido',
            icon: 'pi pi-fw pi-times-circle',
            command: () => this.anularPedido(this.selectedRow)
          });
        } else {
          this.cols = this.cols_default;
        }
        ;

        // Si el usuario solo tiene una aseguradora disponible, ocultamo filtro y columna Aseguradora
        if (this.storageService.getAseguradoras().length == 1) {
          this.cols = this.cols.filter(col => {
            if (col.id == 'ASEGURADORA') return false;
            return true;
          });
        }

        this._selectedColumns = this.cols.filter(col => {
          if (this.not_default.includes(col.id)) return false;
          return true;
        });
        ;

        // Allianz
        if ((this.storageService.getAseguradoras().length == 1 && this.storageService.getAseguradoras()[0] == 10) || (this.storageService.user && this.storageService.user.rol_id == 4)) {
          this.sms_available = true;
        }
      }
    })


  }


  loadRepositorio(event: LazyLoadEvent) {

    this.loading = true;
    let fecha = new Date(this.fechaDesde);
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    if (this.fechaDesde && event.filters && typeof event.filters === 'object') event.filters['fechaDesde'] = {
      value: `${year}-${month}-${day}`,
      matchMode: 'contains'
    };
    this.repositorioService.getRepositorio(event).subscribe((res: any) => {
      if (res) {
        this.totalRecords = res.count;
        res.rows = res.rows.map((r: any) => {

          if (!this.helper.isOutOfDate(r.fecha) && r.estado == 1 && r.fecha_envio_link) r.Estado.estado_nombre = 'Link enviado';
          if (this.helper.isOutOfDate(r.fecha) && r.estado == 1) r.Estado.estado_nombre = 'Vencida';

          return r;
        });
        this.repositorio = res.rows;
        if (this.fechaDesde) this.tablaRepo.filters['fechaDesde'] = {
          value: `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`,
          matchMode: 'contains'
        };
      }
      this.loading = false;
      //this.spinnerService.hide();
    });

  }

  clearFilters() {

    this.selectedCanales = [];
    this.selectedProvincias = [];
    this.selectedAseguradoras = [];
    this.estado = null;
    this._fecha = new Date;
    this.fechaDesde = this._fecha;
    this.fechaHasta = undefined;
    this.dominio = '';
    this.codigo = '';
    this.reinspeccionada = false;
    delete this.tablaRepo.filters["dominio"];
    delete this.tablaRepo.filters["codigo"];
    delete this.tablaRepo.filters["estado"];
    delete this.tablaRepo.filters["fechaDesde"];
    delete this.tablaRepo.filters["fechaHasta"];
    delete this.tablaRepo.filters["canal"];
    delete this.tablaRepo.filters["provincia"];
    delete this.tablaRepo.filters["aseguradora"];


  }

  tooltipEmail(row: Repositorio) {
    let cant_email = row.cant_email;
    let tooltip = `${cant_email} email${cant_email > 1 ? 's' : ''} enviado${cant_email > 1 ? 's' : ''}.`;
    if (row.fecha_envio_aviso) tooltip += `\n\nÚltimo envío ${this.datePipe.transform(new Date(row.fecha_envio_aviso), "dd/MM/YYYY \'a las\' hh:mm:ss \'hs\'")}`;
    return tooltip;
  }

  openIframe(url: string) {
    console.log(url)
    Fancybox.show(
      // Array containing gallery items
      [
        // Gallery item
        {
          src: url,
          type: "iframe",
          preload: false,
        },
      ]
    );
  }

  setFilter(v: any, filter: string, matchMode: string = 'contains') {

    let filterValue = v || null;
    if (filterValue && typeof filterValue == 'object' && filterValue.length == 0) filterValue = null;

    if (filterValue) {
      this.tablaRepo.filters[filter] = { value: filterValue, matchMode: matchMode };
    } else {
      delete this.tablaRepo.filters[filter];
    }

  }

  filter(val: Date, filter: string) {
    console.log(val)
    let fecha = new Date(val);
    let filterValue = val ? `${fecha.getFullYear()}-${fecha.getMonth() - 1}-${fecha.getDate()}` : null;
    this.tablaRepo.filter(filterValue, filter, 'contains');

  }
  limpiarFechas(fecha:string): void {
    if (fecha === 'fechaDesde') {
      this.fechaDesde = this._fecha; 
      this.setFilter(null, 'fechaDesde');
  } else if (fecha === 'fechaHasta') {
      this.fechaHasta = undefined as any;
      this.setFilter(null, 'fechaHasta');
  }
  }

  enviarLinkGestionador(email: string = '', celular: string | number = '') {

    if (email) {

      if (!this.helper.checkEmail(email)) return this.messageService.add({
        severity: 'warning',
        summary: 'Enviar',
        detail: 'El link no ha sido enviado'
      });

      this.loadingEnviarLink = true;

      let data: any = { emailProd: email, idRepo: this.selectedRow.id };
      if (celular) data.celular = celular;

      this.repositorioService.enviarLinkGestionador(data).subscribe({
        next: (res: any) => {
          this.celularAsegurado = "";
          this.loadingEnviarLink = false;
          this.enviarLinkDialog = false;
          this.tablaRepo._filter();
          this.messageService.add({ severity: 'success', summary: 'Enviar link', detail: 'El link ha sido enviado' });
        },
        error: (err: any) => {

          this.celularAsegurado = "";
          this.enviarLinkDialog = false;
          this.loadingEnviarLink = false;
          this.messageService.add({ severity: 'error', summary: 'Enviar link', detail: 'El link no ha sido enviado' });
        }
      });

    }

  }

  checkSms(selectedRow: Repositorio) {
    let result: boolean = false;
    if (selectedRow?.cant_sms && selectedRow.cant_sms >= this.LIMITE_SMS) {
      result = true;
    }
    return result;
  }

  checkAvailability(): MenuItem[] {
    var result!: MenuItem[];
    result = this.contextMenuItems;
    if (this.selectedRow) {
      switch (this.selectedRow.estado) {
        // Finalizada
        case 5:
          for (var menuItem of result) {
            menuItem.disabled = true;
          }
          break;
        //Auditando
        case 4:
        //Reinspeccionando
        case 7:
        //CAncelada
        case 8:
        //Centro
        case 11:
          for (var menuItem of result) {
            menuItem.disabled = menuItem.id !== '3';
          }
          break;
        default:
          for (var menuItem of result) {
            menuItem.disabled = false;
          }

      }

    }
    return result;
  }

  validateEnvio(selectedRow: Repositorio) {
    let result: boolean = false;
    if (selectedRow) {
      switch (selectedRow.estado) {
        //Auditando
        case 4:
        // Finalizada
        case 5:
        //Reinspeccionando
        case 7:
        //CAncelada
        case 8:
        //Centro
        case 11:
          result = true;
      }
    }
    return result;
  }

  anularPedido(solicitud: Repositorio) {

    let datos: any = {};
    this.confirmationService.confirm({
      key: "anularDialog",
      message: '¿Está seguro que desea ANULAR este pedido? No podrá deshacer esta operación.',
      acceptLabel: 'Anular',
      rejectLabel: 'Cancelar',
      defaultFocus: 'reject',
      accept: () => {

        this.loading = true;

        datos.idRepo = solicitud.id;
        datos.key = solicitud.key;
        datos.aseguradora = solicitud.aseguradora;

        this.repositorioService.anularSolicitud(solicitud).subscribe({
          next: (res: any) => {

            this.tablaRepo._filter();
            this.loading = false;
            this.messageService.add({ severity: 'success', summary: 'Anular', detail: 'La solicitud ha sido anulada' });

          },
          error: (err: any) => {

            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Anular', detail: 'La solicitud no ha sido anulada' });
            this.loading = false;

          }
        });

      }
    });

  }

  copyToClickBoard(str: string) {

    navigator.clipboard.writeText(str)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Copiado', detail: 'Link copiado al portapapeles' });
      })
      .catch(err => {
        console.log('Something went wrong', err);
      })

  }

  @Input() get selectedColumns(): any[] {

    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {

    this._selectedColumns = this.cols.filter(col => {

      if (this.not_toggle.includes(col.id)) return true;
      return val.includes(col);

    });

  }

  getToggleColumns(): any[] {
    return this.cols.filter(col => {

      if (this.not_toggle.includes(col.id)) return false;
      return true;
    });
  }


  downloadReport() {

    let fecha = new Date(this.fechaDesde);
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    if (this.fechaDesde) {
      this.tablaRepo.filters['fechaDesde'] = {
        value: `${year}-${month}-${day}`,
        matchMode: 'contains'
      };
    }

    let data = {
      filters: this.tablaRepo.filters,
      rows: this.totalRecords
    }
    this.loading = true;
    this.messageService.add({ severity: 'info', summary: 'Exportar', detail: 'Descargando datos...' });
    this.repositorioService.getRepositorioReport(data).subscribe((res: any) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Exportar', detail: 'Generando Excel...' });
        this.excelService.exportExcel(res.rows, 'repositorio');
      }
      this.loading = false;
    });
  }

  isUserWithPrivileges() {
    return this.storageService.isUserWithPrivileges();
  }

  openReportDialog(encryptedInspectionId: string) {
    
    this.reportDialogVisible = true;
  }

  hideReportDialog() {
    this.reportDialogVisible = false;
  }

}
