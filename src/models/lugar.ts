export interface Lugar {
    id: number,
    lugar_nombre: string,
    provincia_codigo: number,
    provincia_nombre: string,
    ciudad_id: number,
    ciudad_nombre: string,
    codigo_postal: number,
    clave_provloc: number,
    dom_previa_auto: boolean,
    previa_hogar: boolean,
    centro: boolean,
    siniestro_auto: boolean,
    zona_trd: string,
    activo: boolean,
    zona_tarifaria: string
}