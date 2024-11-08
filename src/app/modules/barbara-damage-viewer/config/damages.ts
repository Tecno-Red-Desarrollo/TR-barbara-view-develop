const Damages = {

    ABOLLADO_LEVE: "abollado leve",
    ABOLLADO_MEDIO: "abollado medio",
    ABOLLADO_SEVERO: "abollado severo",
    AMPOLLADO_LEVE: "ampollado leve",
    AMPOLLADO_MEDIO: "ampollado medio",
    AMPOLLADO_SEVERO: "ampollado severo",
    CUARTEADO_LEVE: "cuarteado leve",
    CUARTEADO_MEDIO: "cuarteado medio",
    CUARTEADO_SEVERO: "cuarteado severo",
    OPACO_LEVE: "opaco leve",
    OPACO_MEDIO: "opaco medio",
    OPACO_SEVERO: "opaco severo",
    PICADO_LEVE: "picado leve",
    PICADO_MEDIO: "picado medio",
    PICADO_SEVERO: "picado severo",
    RAJADO_LEVE: "rajado leve",
    RAJADO_MEDIO: "rajado medio",
    RAJADO_SEVERO: "rajado severo",
    RAYADO_LEVE: "rayado leve",
    RAYADO_MEDIO: "rayado medio",
    RAYADO_SEVERO: "rayado severo",
    ROTO: "roto",
    FALTANTE: "faltante",
    GRANIZO: "granizo"

}
//09:09:09:09:1:1:1:1
const DamagesConfig = new Map([
    [Damages.ABOLLADO_LEVE, { codigo: "02", chapa: 1.5, pintura: 1, severidad: 1 }],
    [Damages.ABOLLADO_MEDIO, { codigo: "21", chapa: 2.25, pintura: 1, severidad: 2 }],
    [Damages.ABOLLADO_SEVERO, { codigo: "22", chapa: 3.8, pintura: 1, severidad: 3 }],
    [Damages.AMPOLLADO_LEVE, { codigo: "07", chapa: 1.0, pintura: 1, severidad: 1 }],
    [Damages.AMPOLLADO_MEDIO, { codigo: "71", chapa: 1.0, pintura: 1, severidad: 2 }],
    [Damages.AMPOLLADO_SEVERO, { codigo: "72", chapa: 1.0, pintura: 1, severidad: 3 }],
    [Damages.CUARTEADO_LEVE, { codigo: "05", chapa: 1.2, pintura: 1, severidad: 1 }],
    [Damages.CUARTEADO_MEDIO, { codigo: "51", chapa: 1.2, pintura: 1, severidad: 2 }],
    [Damages.CUARTEADO_SEVERO, { codigo: "52", chapa: 1.2, pintura: 1, severidad: 3 }],
    [Damages.OPACO_LEVE, { codigo: "06", chapa: 1, pintura: 1, severidad: 1 }],
    [Damages.OPACO_MEDIO, { codigo: "61", chapa: 1, pintura: 1, severidad: 2 }],
    [Damages.OPACO_SEVERO, { codigo: "62", chapa: 1, pintura: 1, severidad: 3 }],
    [Damages.PICADO_LEVE, { codigo: "04", chapa: 1.2, pintura: 1, severidad: 1 }],
    [Damages.PICADO_MEDIO, { codigo: "41", chapa: 1.2, pintura: 1, severidad: 2 }],
    [Damages.PICADO_SEVERO, { codigo: "42", chapa: 1.5, pintura: 1, severidad: 3 }],
    [Damages.RAJADO_LEVE, { codigo: "09", chapa: 1.8, pintura: 1, severidad: 1 }],
    [Damages.RAJADO_MEDIO, { codigo: "91", chapa: 2.25, pintura: 1, severidad: 2 }],
    [Damages.RAJADO_SEVERO, { codigo: "92", chapa: 3.2, pintura: 1, severidad: 3 }],
    [Damages.RAYADO_LEVE, { codigo: "03", chapa: 0.25, pintura: 0.25, severidad: 1 }],
    [Damages.RAYADO_MEDIO, { codigo: "31", chapa: 0.5, pintura: 0.5, severidad: 2 }],
    [Damages.RAYADO_SEVERO, { codigo: "32", chapa: 1, pintura: 1, severidad: 3 }],
    [Damages.ROTO, { codigo: "08", chapa: 4, pintura: 1, severidad: 3 }],
    [Damages.FALTANTE, { codigo: "0", chapa: 4, pintura: 1, severidad: 3 }],
    [Damages.GRANIZO, { codigo: "24", chapa: 2, pintura: 1, severidad: 3 }]
]);

const DamagesConfigByCode = new Map([
    ["02", { chapa: 1.5, pintura: 1, severidad: 1, nombre: Damages.ABOLLADO_LEVE }],
    ["21", { chapa: 2.25, pintura: 1, severidad: 2, nombre: Damages.ABOLLADO_MEDIO }],
    ["22", { chapa: 3.8, pintura: 1, severidad: 3, nombre: Damages.ABOLLADO_SEVERO }],
    ["07", { chapa: 1.0, pintura: 1, severidad: 1, nombre: Damages.AMPOLLADO_LEVE }],
    ["71", { chapa: 1.0, pintura: 1, severidad: 2, nombre: Damages.AMPOLLADO_MEDIO }],
    ["72", { chapa: 1.0, pintura: 1, severidad: 3, nombre: Damages.AMPOLLADO_SEVERO }],
    ["05", { chapa: 1.2, pintura: 1, severidad: 1, nombre: Damages.CUARTEADO_LEVE }],
    ["51", { chapa: 1.2, pintura: 1, severidad: 2, nombre: Damages.CUARTEADO_MEDIO }],
    ["52", { chapa: 1.2, pintura: 1, severidad: 3, nombre: Damages.CUARTEADO_SEVERO }],
    ["06", { chapa: 1, pintura: 1, severidad: 1, nombre: Damages.OPACO_LEVE }],
    ["61", { chapa: 1, pintura: 1, severidad: 2, nombre: Damages.OPACO_MEDIO }],
    ["62", { chapa: 1, pintura: 1, severidad: 3, nombre: Damages.OPACO_SEVERO }],
    ["04", { chapa: 1.2, pintura: 1, severidad: 1, nombre: Damages.PICADO_LEVE }],
    ["41", { chapa: 1.2, pintura: 1, severidad: 2, nombre: Damages.PICADO_MEDIO }],
    ["42", { chapa: 1.5, pintura: 1, severidad: 3, nombre: Damages.PICADO_SEVERO }],
    ["09", { chapa: 1.8, pintura: 1, severidad: 1, nombre: Damages.RAJADO_LEVE }],
    ["91", { chapa: 2.25, pintura: 1, severidad: 2, nombre: Damages.RAJADO_MEDIO }],
    ["92", { chapa: 3.2, pintura: 1, severidad: 3, nombre: Damages.RAJADO_SEVERO }],
    ["03", { chapa: 0.25, pintura: 0.25, severidad: 1, nombre: Damages.RAYADO_LEVE }],
    ["31", { chapa: 0.5, pintura: 0.5, severidad: 2, nombre: Damages.RAYADO_MEDIO }],
    ["32", { chapa: 1, pintura: 1, severidad: 3, nombre: Damages.RAYADO_SEVERO }],
    ["08", { chapa: 4, pintura: 1, severidad: 3, nombre: Damages.ROTO }],
    ["0", { chapa: 4, pintura: 1, severidad: 3, nombre: Damages.FALTANTE }],
    ["24", { chapa: 2, pintura: 1, severidad: 3, nombre: Damages.GRANIZO }]
]);

export {
    Damages,
    DamagesConfig,
    DamagesConfigByCode
}