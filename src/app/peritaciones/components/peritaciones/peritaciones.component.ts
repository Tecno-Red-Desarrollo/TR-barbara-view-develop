import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Peritacion } from 'src/models/peritacion';
import { ApiService } from 'src/services/api.service';
import { LazyLoadEvent, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { SpinnerService } from 'src/services/spinner.service';
import { StorageService } from 'src/services/storage.service';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/services/usuario.service';
import { ExcelService } from 'src/services/excel.service';
import { PeritacionesHelper } from '../../peritaciones-helper';
import { PeritacionesService } from '../../services/peritaciones.service';

@Component({
  selector: 'app-peritaciones',
  templateUrl: './peritaciones.component.html',
  styleUrls: ['./peritaciones.component.css']
})
export class PeritacionesComponent implements OnInit {
  @ViewChild('tablaPeritaciones') tablaPeritaciones: Table;

  peritaciones: Peritacion[] = [];

  cols: any[] = [];
  cols_adm: any[];
  cols_default: any[];

  _selectedColumns: any[];

  not_toggle: any[];
  not_default: any[];
  sms_available: boolean = false;

  selectedRow: Peritacion = new Peritacion();
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
  estado?: any;
  selectedProvincias: [] = [];
  selectedAseguradoras: [] = [];

  dominio?: string;
  nro_siniestro?: string;
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

  newApprasialDialogVisible = false;

  constructor(
    private peritacionesService: PeritacionesService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService,
    private usuarioService: UsuarioService,
    public helper: PeritacionesHelper,
    private excelService: ExcelService
  ) {
    this.cols_default = [
      { id: 'FECHA_INSPECCION', header: 'Fecha inspección', field: 'fecha_inspeccion_antecedente', sort: 'fecha_inspeccion_antecedente' },
      { id: 'DOMINIO', header: 'Dominio', field: 'dominio', sort: 'dominio' },
      { id: 'ASEGURADORA_ANTECEDENTE', header: 'Aseguradora', field: 'aseguradora_antecedente', sort: '' },
      { id: 'ASEGURADO_ANTECEDENTE', header: 'Asegurado', field: 'asegurado', sort: '' },
      { id: 'VER_ANTECEDENTE', header: '', field: 'ver_antecedente', sort: '' },
      { id: 'COBERTURA_ANTECEDENTE', header: 'Cobertura soportada', field: 'cobertura_soportada_antecedente', sort: '' },
      { id: 'SOLICITUD', header: 'Solicitud', field: 'nro_siniestro', sort: 'nro_siniestro' },
      { id: 'FECHA_PERITACION', header: 'Fecha peritación', field: 'fecha_peritacion', sort: 'fecha_peritacion' },
      { id: 'ESTADO', header: 'Estado', field: 'estado', sort: '' },
      { id: 'FECHA_ULTIMA_MOD', header: 'F. última modificación', field: 'fecha_ultima_mod', sort: 'fecha_ultima_mod' },
      { id: 'VER_IP', header: '', field: 'ver_ip', sort: '' },
      { id: 'ESTIMACION_DANIOS', header: 'Estimación daños', field: 'estimacion_danios', sort: 'estimacion_danios' },
      /*       { id: 'COBERTURA_SOLICITADA', header: 'COBERTURA SOLICITADA', field: 'cobertura_solicitada', sort: '' },
            { id: 'COBERTURA_OTORGADA', header: 'COBERTURA OTORGADA', field: 'cobertura' }, */
    ];

    this.cols_adm = [
      { id: 'FECHA_INSPECCION', header: 'Fecha inspección', field: 'fecha_inspeccion_antecedente', sort: 'fecha_inspeccion_antecedente' },
      { id: 'DOMINIO', header: 'Dominio', field: 'dominio', sort: 'dominio' },
      { id: 'ASEGURADORA_ANTECEDENTE', header: 'Aseguradora', field: 'aseguradora_antecedente', sort: '' },
      { id: 'ASEGURADO_ANTECEDENTE', header: 'Asegurado', field: 'asegurado', sort: '' },
      { id: 'VER_ANTECEDENTE', header: '', field: 'ver_antecedente', sort: '' },
      { id: 'COBERTURA_ANTECEDENTE', header: 'Cobertura soportada', field: 'cobertura_soportada_antecedente', sort: '' },
      { id: 'SOLICITUD', header: 'Solicitud', field: 'nro_siniestro', sort: 'nro_siniestro' },
      { id: 'FECHA_PERITACION', header: 'Fecha peritación', field: 'fecha_peritacion', sort: 'fecha_peritacion' },
      { id: 'ESTADO', header: 'Estado', field: 'estado', sort: '' },
      { id: 'FECHA_ULTIMA_MOD', header: 'F. última modificación', field: 'fecha_ultima_mod', sort: 'fecha_ultima_mod' },
      { id: 'VER_IP', header: '', field: 'ver_ip', sort: '' },
      { id: 'ESTIMACION_DANIOS', header: 'Estimación daños', field: 'estimacion_danios', sort: 'estimacion_danios' },
      /*       { id: 'COBERTURA_SOLICITADA', header: 'COBERTURA SOLICITADA', field: 'cobertura_solicitada', sort: '' },
      { id: 'COBERTURA_OTORGADA', header: 'COBERTURA OTORGADA', field: 'cobertura' }, */
    ];

    this.not_toggle = ['ESTADO', 'ASEGURADORA', 'DOMINIO', 'REINSPECCION', 'CANT_AVISOS', 'VER_ANTECEDENTE'];
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

        this.peritacionesService.getEstados().subscribe((res: any) => {
          if (res) {
            //res.push({ id: 90, nombre: 'Link enviado', enombre: 'Link enviado' });
            //res.push({ id: 99, nombre: 'Vencida', enombre: 'Vencida' });
            this.estados = res;
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


  loadPeritaciones(event: LazyLoadEvent) {

    this.loading = true;
    let fecha = new Date(this.fechaDesde);
    let year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let day = fecha.getDate();
    if (this.fechaDesde && event.filters && typeof event.filters === 'object') event.filters['fechaDesde'] = {
      value: `${year}-${month}-${day}`,
      matchMode: 'contains'
    };
    this.peritacionesService.getPeritaciones(event).subscribe((res: any) => {
      if (res) {
        this.totalRecords = res.count;
        res.rows = res.rows.map((r: any) => {

          if (!this.helper.isOutOfDate(r.fecha) && r.estado == 1 && r.fecha_envio_link) r.EstadoPeritacion.nombre = 'Link enviado';
          if (this.helper.isOutOfDate(r.fecha) && r.estado == 1) r.EstadoPeritacion.nombre = 'Vencida';

          return r;
        });
        this.peritaciones = res.rows;
        if (this.fechaDesde) this.tablaPeritaciones.filters['fechaDesde'] = {
          value: `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`,
          matchMode: 'contains'
        };
      }
      this.loading = false;
      //this.spinnerService.hide();
    });

  }

  clearFilters() {

    this.selectedProvincias = [];
    this.selectedAseguradoras = [];
    this.estado = null;
    this._fecha = new Date;
    this.fechaDesde = this._fecha;
    this.fechaHasta = undefined;
    this.dominio = '';
    this.nro_siniestro = '';
    this.reinspeccionada = false;
    delete this.tablaPeritaciones.filters["dominio"];
    delete this.tablaPeritaciones.filters["nro_siniestro"];
    delete this.tablaPeritaciones.filters["estado"];
    delete this.tablaPeritaciones.filters["fechaDesde"];
    delete this.tablaPeritaciones.filters["fechaHasta"];
    delete this.tablaPeritaciones.filters["canal"];
    delete this.tablaPeritaciones.filters["provincia"];
    delete this.tablaPeritaciones.filters["aseguradora"];


  }

  tooltipEmail(row: Peritacion) {
    let cant_email = row.cant_email;
    let tooltip = `${cant_email} email${cant_email > 1 ? 's' : ''} enviado${cant_email > 1 ? 's' : ''}.`;
    if (row.fecha_envio_aviso) tooltip += `\n\nÚltimo envío ${this.datePipe.transform(new Date(row.fecha_envio_aviso), "dd/MM/YYYY \'a las\' hh:mm:ss \'hs\'")}`;
    return tooltip;
  }

  openIframe(url: string) {
    /* Fancybox.show(
      // Array containing gallery items
      [
        // Gallery item
        {
          src: url,
          type: "iframe",
          preload: false,
        },
      ]
    ); */
  }

  setFilter(v: any, filter: string, matchMode: string = 'contains') {
    let filterValue = v || null;
    if (filterValue && typeof filterValue == 'object' && filterValue.length == 0) filterValue = null;

    if (filterValue) {
      this.tablaPeritaciones.filters[filter] = { value: filterValue, matchMode: matchMode };
    } else {
      delete this.tablaPeritaciones.filters[filter];
    }

  }

  filter(val: Date, filter: string) {
    let fecha = new Date(val);
    let filterValue = val ? `${fecha.getFullYear()}-${fecha.getMonth() - 1}-${fecha.getDate()}` : null;
    this.tablaPeritaciones.filter(filterValue, filter, 'contains');

  }


  sendAccessLink(email: string = '', celular: string | number = '') {

    if (email) {

      if (!this.helper.checkEmail(email)) return this.messageService.add({
        severity: 'warning',
        summary: 'Enviar',
        detail: 'El link no ha sido enviado'
      });

      this.loadingEnviarLink = true;

      let data: any = { emailProd: email, idRepo: this.selectedRow.id };
      if (celular) data.celular = celular;

      this.peritacionesService.sendAccessLink(data).subscribe({
        next: (res: any) => {
          this.celularAsegurado = "";
          this.loadingEnviarLink = false;
          this.enviarLinkDialog = false;
          this.tablaPeritaciones._filter();
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

  checkSms(selectedRow: Peritacion) {
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

  validateEnvio(selectedRow: Peritacion) {
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

  anularPedido(solicitud: Peritacion) {

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

        this.peritacionesService.anularSolicitud(solicitud).subscribe({
          next: (res: any) => {

            this.tablaPeritaciones._filter();
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
      this.tablaPeritaciones.filters['fechaDesde'] = {
        value: `${year}-${month}-${day}`,
        matchMode: 'contains'
      };
    }

    let data = {
      filters: this.tablaPeritaciones.filters,
      rows: this.totalRecords
    }
    this.loading = true;
    this.messageService.add({ severity: 'info', summary: 'Exportar', detail: 'Descargando datos...' });
    this.peritacionesService.getPeritacionesReport(data).subscribe((res: any) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Exportar', detail: 'Generando Excel...' });
        this.excelService.exportExcel(res.rows, 'peritaciones');
      }
      this.loading = false;
    });
  }

  openNewApprasialDialog() {
    this.newApprasialDialogVisible = true;
  }

  apprasialAdded() {
    this.newApprasialDialogVisible = false;
    this.tablaPeritaciones._filter()
  }

}
