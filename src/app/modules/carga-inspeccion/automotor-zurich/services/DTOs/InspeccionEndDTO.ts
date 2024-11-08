import { Foto } from "../../models/foto"

export interface InspeccionEndDTO {
  _token: string,
  _userId: string
  accuracy: string
  agenda_id: string
  anio: string
  aseguradora: string
  auditado_por: string
  b1: string
  b10: string
  b11: string
  b12: string
  b13: string
  b14: string
  b15: string
  b16: string
  b2: string
  b3: string
  b4: string
  b5: string
  b6: string
  b7: string
  b8: string
  b9: string
  baul: string
  callback: string
  canal_sel: string
  capot: string
  chasis: string
  cobertura_solicitada: string
  codigo: string
  coincide_chasis: string
  coincide_motor: string
  cp: string
  cristal_d_i: string
  cristal_t_d: string
  cristal_t_i: string
  danios: string
  dominio: string
  espejo_d: string
  espejo_i: string
  formRepo: boolean
  gb_d_d: string
  gb_d_i: string
  gb_t_d: string
  gb_t_i: string
  gnc: string
  gnc_vencimiento: string
  ia: string
  id: string
  idRepo: string
  key: string
  km: string
  latitud: string
  localidad: string
  longitud: string
  luneta: string
  marca: string
  modelo: string
  motor: string
  n: string
  optica_d_d: string
  optica_d_i: string
  optica_t_d: string
  optica_t_i: string
  parabrisas: string
  paragolpe_d: string
  paragolpe_t: string
  parante_d: string
  parante_i: string
  parrilla: string
  precio: string
  productor_email: string
  puerta_d_i: string
  puerta_t_d: string
  puerta_t_i: string
  rueda_aux_1: string
  seaudita: string
  techo: string
  tipo: string
  tipo_vehiculo: string
  tipo_vehiculo_id: string
  titular_apellido: string
  titular_dni: string
  titular_email: string
  titular_nombre: string
  titular_telefono: string
  traccion: string
  tuvo_siniestro: string
  uso: string
  usuario: string
  vtv: string
  zocalo_d: string
  zocalo_i: string
  fotos: Array<Foto>
}
