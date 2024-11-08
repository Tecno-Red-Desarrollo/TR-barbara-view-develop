import { Parts } from "../parts.enum";

export const PartCoordsAutomovil = new Map([

    //FRENTE
    [Parts.paragolpe_d, { x: 310, y: 40 }],
    [Parts.optica_d_i, { x: 265, y: 60 }],
    [Parts.optica_d_d, { x: 355, y: 60 }],

    // Lateral izquierdo
    [Parts.rueda_1_i_e, { x: 146, y: 195 }],
    [Parts.gb_d_i, { x: 174, y: 218 }],
    [Parts.puerta_d_i, { x: 165, y: 260 }],
    [Parts.cristal_d_i, { x: 200, y: 285 }],
    [Parts.zocalo_i, { x: 135, y: 300 }],
    [Parts.puerta_t_i, { x: 165, y: 330 }],
    [Parts.cristal_t_i_ventilete, { x: 202, y: 330 }],
    [Parts.rueda_2_i_e, { x: 146, y: 382 }],
    [Parts.gb_t_i, { x: 185, y: 395 }],


    // Lateral derecho
    [Parts.rueda_1_d_e, { x: 475, y: 195 }],
    [Parts.gb_d_d, { x: 450, y: 218 }],
    [Parts.puerta_d_d, { x: 460, y: 260 }],
    [Parts.cristal_d_d, { x: 420, y: 285 }],
    [Parts.zocalo_d, { x: 485, y: 300 }],
    [Parts.puerta_t_d, { x: 460, y: 330 }],
    [Parts.cristal_t_d, { x: 418, y: 330 }],
    [Parts.rueda_2_d_e, { x: 475, y: 382 }],
    [Parts.gb_t_d, { x: 435, y: 395 }],

    // Vista arriba
    [Parts.capot, { x: 310, y: 180 }],
    [Parts.parabrisas, { x: 310, y: 240 }],
    [Parts.espejo_i, { x: 250, y: 242 }],
    [Parts.espejo_d, { x: 371, y: 242 }],
    [Parts.techo, { x: 310, y: 300 }],
    [Parts.luneta, { x: 310, y: 390 }],

    // Atras
    [Parts.optica_t_i, { x: 265, y: 500 }],
    [Parts.optica_t_d, { x: 355, y: 500 }],
    [Parts.baul, { x: 310, y: 507 }],
    [Parts.paragolpe_t, { x: 310, y: 540 }],
]);
