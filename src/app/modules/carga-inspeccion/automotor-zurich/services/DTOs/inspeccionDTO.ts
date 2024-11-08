import { Accesorios } from "../../models/accesorios";
import { ConfiguracionFoto } from "../../models/configuracion-foto";
import { Inspeccion } from "../../models/inspeccion";
import { Productos } from "../../models/productos";

export class InspeccionDTO {
  inspeccion: Inspeccion; //Lo más importante!
  accesorios: Accesorios;
  productos: Array<Productos>;
  fotos: Array<ConfiguracionFoto>;
  agendaId: number;
  aseguradora: number;
  auditado_por: number;
  b16: string;
  callback: string;
  canal: number;
  chasis: string;
  cobertura: string;
  coberturas: string;
  codigo: string;
  conIA: boolean;
  cp: number;
  envioEmail: boolean;
  esProductor: boolean;
  formuPro: boolean;
  gnc_vencimiento: string;
  ia: number;
  idRepo: string;
  info: string;
  key: string;
  km: string;
  localidad: number;
  calle: string;
  numero: string;
  longitud: string;
  latitud: string;
  motor: string;
  muestraDeclaracionVTV: boolean;
  n: string;
  noEdita: boolean;
  obligaGeo: boolean;
  permiteDesktop: boolean;
  permiteGaleriaDDJJ: boolean;
  permiteGaleriaProd: boolean;
  precio: number;
  productorEmail: string;
  provincia: number;
  seaudita: boolean;
  sinCaracteristicas: boolean;
  sinTop: boolean;
  titularApellido: string;
  titularDni: string;
  titularEmail: string;
  titularNombre: string;
  titularTelefono: string;
  traccion: string;
  tv: string;
  tvId: string;
  uso: string;
  _token: string;
  _userId: string;

  constructor(inspeccion: Inspeccion, accesorios: Accesorios, productos: Array<Productos>, fotos: Array<ConfiguracionFoto>,
    agendaId: number, aseguradora: number, auditado_por: number, b16: string, callback: string,
    canal: number, chasis: string, cobertura: string, coberturas: string, codigo: string, conIA: boolean,
    cp: number, envioEmail: boolean, esProductor: boolean, formuPro: boolean, gnc_vencimiento: string,
    ia: number, idRepo: string, info: string, key: string, km: string, localidad: number, motor: string,
    muestraDeclaracionVTV: boolean, n: string, noEdita: boolean, obligaGeo: boolean,
    productorEmail: string, permiteDesktop: boolean, permiteGaleriaDDJJ: boolean, permiteGaleriaProd: boolean,
    precio: number, provincia: number, seaudita: boolean, sinCaracteristicas: boolean, sinTop: boolean,
    titularApellido: string, titularDni: string, titularEmail: string, titularNombre: string, titularTelefono: string,
    traccion: string, tv: string, tvId: string, uso: string, _token: string, _userId: string, calle: string = "", numero: string = ""
  ) {
    this.inspeccion = inspeccion;
    this.accesorios = accesorios;
    this.productos = productos;
    this.agendaId = agendaId;
    this.aseguradora = aseguradora;
    this.auditado_por = auditado_por;
    this.b16 = b16;
    this.callback = callback;
    this.canal = canal;
    this.chasis = chasis;
    this.cobertura = cobertura;
    this.coberturas = coberturas;
    this.codigo = codigo;
    this.conIA = conIA;
    this.cp = cp;
    this.envioEmail = envioEmail;
    this.esProductor = esProductor;
    this.formuPro = formuPro;
    this.fotos = fotos;
    this.gnc_vencimiento = gnc_vencimiento;
    this.ia = ia;
    this.idRepo = idRepo;
    this.info = info;
    this.key = key;
    this.km = km;
    this.localidad = localidad;
    this.longitud = "";
    this.latitud = ""
    this.motor = motor;
    this.muestraDeclaracionVTV = muestraDeclaracionVTV;
    this.n = n;
    this.noEdita = noEdita;
    this.obligaGeo = obligaGeo;
    this.permiteDesktop = permiteDesktop;
    this.permiteGaleriaDDJJ = permiteGaleriaDDJJ;
    this.permiteGaleriaProd = permiteGaleriaProd;
    this.precio = precio;
    this.productorEmail = productorEmail;
    this.provincia = provincia;
    this.seaudita = seaudita;
    this.sinCaracteristicas = sinCaracteristicas;
    this.sinTop = sinTop;
    this.titularApellido = titularApellido;
    this.titularDni = titularDni;
    this.titularEmail = titularEmail;
    this.titularNombre = titularNombre;
    this.titularTelefono = titularTelefono;
    this.traccion = traccion;
    this.tv = tv;
    this.tvId = tvId;
    this.uso = uso;
    this._token = _token;
    this._userId = _userId;
    this.calle = calle;
    this.numero = numero;
  }
}
