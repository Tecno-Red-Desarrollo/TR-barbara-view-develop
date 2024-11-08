import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Vehiculo } from 'src/app/modules/carga-inspeccion/automotor-zurich/models/vehiculo';
import { Score } from 'src/models/score';
import { InspeccionDTO } from 'src/app/modules/carga-inspeccion/automotor-zurich/services/DTOs/inspeccionDTO';
import { InspeccionEndDTO } from 'src/app/modules/carga-inspeccion/automotor-zurich/services/DTOs/InspeccionEndDTO';
import { TipoInspeccion } from 'src/app/modules/carga-inspeccion/automotor-zurich/models/tipo-inspeccion';
import { Inspeccion } from 'src/app/modules/carga-inspeccion/automotor-zurich/models/inspeccion';
import { SolicitudInspeccionDTO } from './DTOs/solicitudInspeccionDTO';
import { Detalle } from '../helpers/Detalles.enum';

@Injectable()
export class InspeccionService {
  solicitudInspeccionDTO!: SolicitudInspeccionDTO;
  //son vehículos que no tienen lado de acompañante y lado de conductor.
  private vehiclesNotAutoDescription: string[] = ['MOTO', 'CICLOMOTOR', 'CUATRICICLO'];
  private configFotosAdditionalMoto: any[] = [/*{
    activo: true,
    archivo: "dni",
    aseguradora: 33,
    etiqueta: "DNI / Licencia",
    id: 90,
    obligatoria: true,
    tipo: "Documentos"
  },
  {
    activo: true,
    archivo: "cedula_verde",
    aseguradora: 33,
    etiqueta: "Cedula Verde",
    id: 91,
    obligatoria: true,
    tipo: "Documentos"
  }*/]

  constructor(private _http: HttpClient, private router: Router) { }

  private getToken(): string {
    let token = String(sessionStorage.getItem("token"));
    return token;
  }

  private getUserId(): Number {
    let userId = Number(sessionStorage.getItem("userId"));
    return userId;
  }

  private setHeaderOptions() {
    let token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  public demoLogin() {
    console.log("DEVELOPMENT MODE - DEMO LOGIN");
    let barbaraTestingURL = "http://tst.barbara.com.ar/api/login/";
    let localhostURL = environment.apiUrl + "login/";
    let user = ""//environment.demoUser;
    let pass = ""//environment.demoPassword;
    let url = localhostURL;
    this._http.post<any>(url, { user: user, pass: pass }, this.setHeaderOptions()).subscribe({
      next: (res: any) => {
        console.log("Logged in successfully with demo user " + user);
        //console.log(JSON.stringify(res));
        String(localStorage.setItem("token", res.token));
        String(localStorage.setItem("userId", res.id));
      },
      error: (err: any) => {
        console.log("Demo login failed with user " + user);
        console.log(JSON.stringify(err));
      }
    });
  }

  public getSolicitudInspeccion(data: any): Promise<InspeccionDTO> {
    return new Promise<InspeccionDTO>((resolve) => {
      this.getRepositorioById(data)
        .subscribe({
          next: (res: any) => {
            let type_vehicle = res.tv;
            res.fotos = this.setConfigFotos(res.fotos, res.cobertura, type_vehicle);
            let inspeccion = this.buildInspeccion(res);
            resolve(inspeccion);
          },
          error: (err: any) => {
            console.log(err);
            this.router.navigate(['carga-inspeccion/error'], {
              queryParams:
              {
                statusText: "Error en la Inspección",
                //message: err.error.message == null ? err.error : err.error.message
                message: err.status
              }
            });
          }
        });
    });
  }

  /* Nuevas implementaciones INICIO */
  private setConfigFotos(fotos: any, cobertura: string, type_vehicle: string): Array<string> {
    let configFotosToInspection: Array<any> = [];
    //Guardo las configuraciones de fotos fijas (las que siempre te van a pedir sin importar la cobertura que tenga).
    let configFotos_fix = this.setConfigFotosByDefault(fotos, type_vehicle);
    configFotosToInspection = configFotos_fix;

    //Obtengo las otras configuraciones de fotos para luego filtrarlas por el tipo de cobertura.
    let configFotosToValidate = this.setConfigFotosNotDefault(fotos, configFotos_fix, type_vehicle);
    let configfotos_coverage = this.filterFotosByCoberturas(configFotosToValidate, cobertura);

    //Guardo todos los configFotos según cobertura que posea
    for (let i = 0; i < configfotos_coverage.length; i++) {
      configFotosToInspection.push(configfotos_coverage[i]);
    }
    configFotosToInspection = this.setLabeltConfigFotosByTypeVehicle(configFotosToInspection, type_vehicle);

    // Quitamos las fotos que no son para moto. PARCHE PARA TAPAR LA DESORGANIZACION Y SECUENCIA ACTUAL.
    const CONFIGFOTOS_ARCHIVO_NOTAUTO = ['parabrisas', 'auxilio', 'odometro', 'oblea_vtv', 'techo'];
    if (this.vehiclesNotAutoDescription.includes(type_vehicle)) {
      configFotosToInspection = configFotosToInspection.filter(fot => !CONFIGFOTOS_ARCHIVO_NOTAUTO.includes(fot.archivo));
    }

    return configFotosToInspection;
  }

  private setConfigFotosNotDefault(configFotos: Array<any>, configFotosFix: Array<any>, type_vehicle: string): Array<any> {
    // Estos Id's corresponden al parabrisas y rueda de auxilio que son los config_fotos que
    // no corresponden a los vehículos de tipo moto, cuatriciclo, etc.
    const CONFIGFOTOS_ARCHIVO_NOTAUTO = ['parabrisas', 'auxilio', 'odometro', 'oblea_vtv', 'techo'];

    let notf: any[] = [];
    if (this.vehiclesNotAutoDescription.includes(type_vehicle)) {
      notf = configFotos.filter((x) => !CONFIGFOTOS_ARCHIVO_NOTAUTO.includes(x.archivo));
      return notf.filter((x) => !configFotosFix.includes(x));
    }
    else {
      // Es una burrada la segunda condición, pero es temporal
      // La idea es eliminar el config oblea_vtv. Luego, en Características adicionales se agregará o no la misma.
      //hay que hacerlo
      notf = configFotos.filter((x) => x.archivo === 'odometro');

      return notf.filter((x) => !configFotosFix.includes(x));
      // return configFotos.filter((x) => !configFotosFix.includes(x));
    }
  }

  private setDefaultPhotoConfigsByVehicleType(fotos: any, tipo_vehiculo: string) {

  }

  private setConfigFotosByDefault(fotos: any, type_vehicle: string): Array<any> {
    const CONFIGFOTOS_ARCHIVO_GENERAL = ['lateral_acompanante', 'lateral_conductor', 'trasera', 'frente'];
    let config_fotos_fix: any[] = [];
    if (this.vehiclesNotAutoDescription.includes(type_vehicle)) {
      for (var i = 0; i < fotos.length; i++) {
        if (CONFIGFOTOS_ARCHIVO_GENERAL.includes(fotos[i].archivo)) {
          config_fotos_fix.push(fotos[i]);
        }
      }
      config_fotos_fix = config_fotos_fix.concat(this.configFotosAdditionalMoto);
    }
    else {
      for (var i = 0; i < fotos.length; i++) {
        if (CONFIGFOTOS_ARCHIVO_GENERAL.includes(fotos[i].archivo)) {
          config_fotos_fix.push(fotos[i]);
        }
      }
    }

    // Agregamos temporalmente hasta tener un config de fotos estable.
    for (var i = 0; i < fotos.length; i++) {
      if (!CONFIGFOTOS_ARCHIVO_GENERAL.includes(fotos[i].archivo) && !Object.values(Detalle).includes(fotos[i].archivo)) { // No incluimos las fotos que se configuran por detalle
        config_fotos_fix.push(fotos[i]);
      }
    }

    return config_fotos_fix;
  }

  private setLabeltConfigFotosByTypeVehicle(photos: any, type_vehicle: string): Array<any> {
    if (this.vehiclesNotAutoDescription.includes(type_vehicle)) {
      for (let i = 0; i < photos.length; i++) {
        if (photos[i].etiqueta.includes('Lateral Acompañante') || photos[i].archivo.includes('lateral_acompanante')) {
          photos[i].etiqueta = 'Lateral Izquierda';
          photos[i].archivo = 'lateral_acompanante';// Dejamos lateral_acompanante por el momento para no complicar auditoría
        }
        if (photos[i].etiqueta.includes('Lateral Conductor') || photos[i].archivo.includes('lateral_conductor')) {
          photos[i].etiqueta = 'Lateral Derecho';
          photos[i].archivo = 'lateral_conductor'; // Dejamos lateral_conductor por el momento para no complicar auditoría
        }
      }
    }
    return photos;
  }

  //Cambiar a otro nombre para entender que se trata de vehiculos que no posean lateral acompañante
  //y lateral derecha. Ejemplo: MOTO, CUATRICILO, etc.
  public IsNotVehicle(type_vehicle: string): boolean {
    let isNotVehicle: boolean = false;
    if (this.vehiclesNotAutoDescription.includes(type_vehicle)) {
      isNotVehicle = true;
    }
    return isNotVehicle;
  }
  /* Nuevas implementaciones FIN */

  private filterFotosByCoberturas(fotos: any, cobertura: string): Array<string> {
    let configfotos_coverage = [];
    for (var i = 0; i < fotos.length; i++) {
      if (fotos[i].coberturas.split(',').includes(cobertura)) {
        configfotos_coverage.push(fotos[i]);
      }
    }
    return configfotos_coverage;
  }

  public getByAseguradoraId(id: number) {
    let userId = this.getUserId();
    let url = environment.apiUrl + 'configfotos/getByAseguradoraId/' + id;
    return this._http.post<any>(url, { _userId: userId }, this.setHeaderOptions());
  }

  public sendScore(data: Score) {
    let url = environment.apiUrl + 'scores/save';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  public buildInspeccion(solicitud: SolicitudInspeccionDTO): InspeccionDTO {
    let tipoInspeccion = new TipoInspeccion(0, '');
    let vehiculo = new Vehiculo();
    vehiculo.anio = solicitud.anio.toString();
    vehiculo.dominio = solicitud.dominio;
    vehiculo.marca = solicitud.marca;
    vehiculo.modelo = solicitud.modelo;
    vehiculo.tipo_id = solicitud.tvId;
    vehiculo.tipo_descripcion = solicitud.tv;

    let inspeccion = new Inspeccion(+solicitud.idRepo, tipoInspeccion, vehiculo);
    const productos = solicitud.productos;
    const fotos = solicitud.fotos;
    const inspeccionDTO = new InspeccionDTO(inspeccion, solicitud.accesorios, productos, fotos, solicitud.agendaId,
      solicitud.aseguradora, solicitud.auditado_por, solicitud.b16, solicitud.callback,
      solicitud.canal, solicitud.chasis, solicitud.cobertura, solicitud.coberturas, solicitud.codigo,
      solicitud.conIA, solicitud.cp, solicitud.envioEmail, solicitud.esProductor,
      solicitud.formuPro, solicitud.gnc_vencimiento, solicitud.ia,
      solicitud.idRepo, solicitud.info, solicitud.key, solicitud.km, solicitud.localidad,
      solicitud.motor, solicitud.muestraDeclaracionVTV, solicitud.n, solicitud.noEdita,
      solicitud.obligaGeo, solicitud.productorEmail, solicitud.permiteDesktop,
      solicitud.permiteGaleriaDDJJ, solicitud.permiteGaleriaProd, solicitud.precio,
      solicitud.provincia, solicitud.seaudita, solicitud.sinCaracteristicas,
      solicitud.sinTop, solicitud.titularApellido, solicitud.titularDni, solicitud.titularEmail,
      solicitud.titularNombre, solicitud.titularTelefono, solicitud.traccion, solicitud.tv,
      solicitud.tvId, solicitud.uso, solicitud._token, solicitud._userId, solicitud.calle, solicitud.numero);


    console.log("Información básica DTO de la solicitud de carga inspección del automotor: ", inspeccionDTO);
    return inspeccionDTO;
  }

  public endInspeccion(inspeccionDTO: InspeccionDTO) {
    let url = environment.apiUrl + 'guardarInspeccion';
    let inspeccionEnd = this.transformInspeccionDTO(inspeccionDTO);
    return this._http.post<any>(url, this.toJSON(inspeccionEnd), this.setHeaderOptions());
  }

  // Este método se encargará de transformar inspeccionDTO a inspeccionEndDTO.
  // Éste último, es el objeto que necesita el endpoint upIP del backend.
  private transformInspeccionDTO(inspeccionDTO: InspeccionDTO): InspeccionEndDTO {
    const insp = inspeccionDTO;
    let inspeccionEnd: InspeccionEndDTO;
    inspeccionEnd = {
      _token: insp._token,
      _userId: insp._userId,
      accuracy: "1",
      agenda_id: !isNaN(insp.agendaId) ? insp.agendaId.toString() : "",
      anio: insp.inspeccion.vehiculo.anio,
      aseguradora: !isNaN(insp.aseguradora) ? insp.aseguradora.toString() : "",
      auditado_por: !isNaN(insp.auditado_por) ? insp.auditado_por.toString() : "",
      b1: "0",
      b10: "0",
      b11: "0",
      b12: "0",
      b13: "0",
      b14: "0",
      b15: "0",
      b16: insp.b16,
      b2: "0",
      b3: "0",
      b4: "0",
      b5: "0",
      b6: "0",
      b7: "0",
      b8: "0",
      b9: "0",
      baul: "",
      callback: insp.callback,
      canal_sel: insp.canal.toString(),
      capot: "",
      chasis: insp.chasis,
      cobertura_solicitada: insp.cobertura,
      codigo: insp.codigo,
      coincide_chasis: "COINCIDE",
      coincide_motor: "COINCIDE",
      cp: insp.cp.toString(),
      cristal_d_i: "",
      cristal_t_d: "",
      cristal_t_i: "",
      danios: "",
      dominio: insp.inspeccion.vehiculo.dominio,
      espejo_d: "",
      espejo_i: "",
      formRepo: insp.formuPro,
      gb_d_d: "",
      gb_d_i: "",
      gb_t_d: "",
      gb_t_i: "",
      gnc: "",
      gnc_vencimiento: insp.gnc_vencimiento,
      ia: insp.ia.toString(),
      id: "0", //AVERIGUAR QUÉ ES ÉSTO
      idRepo: insp.idRepo,
      key: insp.key,
      km: insp.km,
      localidad: insp.localidad.toString(),
      longitud: insp.longitud,
      latitud: insp.latitud,
      luneta: "",
      marca: insp.inspeccion.vehiculo.marca,
      modelo: insp.inspeccion.vehiculo.modelo,
      motor: insp.motor,
      n: insp.n,
      optica_d_d: "",
      optica_d_i: "",
      optica_t_d: "",
      optica_t_i: "",
      parabrisas: "",
      paragolpe_d: "",
      paragolpe_t: "",
      parante_d: "",
      parante_i: "",
      parrilla: "",
      precio: insp.precio != null ? insp.precio.toString() : "sin precio",
      productor_email: insp.productorEmail,
      puerta_d_i: "",
      puerta_t_d: "",
      puerta_t_i: "",
      rueda_aux_1: "5:185/50 13:OTRA:OTRA:false:false:false:false", //AVERIGUAR DE DÓNDE SALE ÉSTO
      seaudita: insp.seaudita != null ? insp.seaudita.toString() : "",
      techo: "",
      tipo: "20", //AVERIGUAR DE DÓNDE SALE ÉSTO
      tipo_vehiculo: insp.tv,
      tipo_vehiculo_id: insp.tvId,
      titular_apellido: insp.titularApellido,
      titular_dni: insp.titularDni,
      titular_email: insp.titularEmail,
      titular_nombre: insp.titularNombre,
      titular_telefono: insp.titularTelefono,
      traccion: insp.traccion,
      tuvo_siniestro: "0", //AVERIGUAR DE DÓNDE SALE ÉSTO
      uso: "",
      usuario: insp._userId,
      vtv: "",
      zocalo_d: "",
      zocalo_i: "",
      fotos: insp.inspeccion.vehiculo.fotos
    }
    return inspeccionEnd;
  }

  private getRepositorioById(data: any) {
    let userId = this.getUserId();
    let url = environment.apiUrl + 'repositorio/getByUrlParams';
    return this._http.post<any>(url, this.toJSON(data), this.setHeaderOptions());
  }

  private toJSON(object: any) {
    let extra: any = {};
    let classProperties = Object.getOwnPropertyNames(object);
    for (let i = 0; i < classProperties.length; i++) {
      extra[classProperties[i]] = object[classProperties[i]];
    }
    return Object.assign({ _userId: this.getUserId() }, extra)
  }
}
