
import { Detalle } from './Detalles.enum';
import { ConfiguracionFoto } from '../models/configuracion-foto';

export class DetailsAdditional {
  private static config_fotos = new Map([
    [ Detalle.GNC.toString(), new ConfiguracionFoto(0, Detalle.GNC, true, "Tarjeta GNC", "Documentos") ],
    [ Detalle.AIRBAG.toString(), new ConfiguracionFoto(0, Detalle.AIRBAG, true, "Airbag explotado", "Carrocería") ],
    [ Detalle.WHEEL.toString(), new ConfiguracionFoto(0, Detalle.WHEEL, true, "Rueda Auxilio", "Carrocería") ],
    [ Detalle.VTV.toString(), new ConfiguracionFoto(0, Detalle.VTV, true, "Oblea VTV / RTO", "Documentos") ]
  ]);

  public static get(detalle: string): any {
    //No necesariamente tenga que devolver un default porque ya tenemos fijas las instancias correspondientes.
    return this.config_fotos.get(detalle) || "No se encuentra configuración de foto.";
  }
}
