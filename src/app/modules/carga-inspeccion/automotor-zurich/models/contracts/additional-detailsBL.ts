
export class AdditionalDetailsBL {
  private static Moto = [
    { title: 'oblea_vtv', description: 'Declaro que en mi jurisdicción la VTV no resulta exigible para este vehículo', value: undefined }
  ]

  private static General = [
    { title: 'tarjeta_gnc', description: 'Posee GNC', value: undefined },
    { title: 'airbag_explotado', description: 'AirBag explotado', value: undefined },
    { title: 'auxilio', description: 'Posee rueda auxilio', value: undefined },
    { title: 'oblea_vtv', description: 'Declaro que en mi jurisdicción la VTV no resulta exigible para este vehículo', value: undefined }
  ]


  // Validación necesaria para checkear que en el caso de que se selecciona SI en Declaro que en mi...
  // no pida la foto de la oblea vtv.
  public static VerifySelectedValue(description: string, checked: boolean): any {
    if (description.includes("oblea_vtv")) {
      return !checked;
    }
    return checked;
  }

  public static SetDetailsByVehicleType(vehicleType: string, details: Array<any>): any {
    let vehiclesNotAutoDescription: string[] = ['MOTO', 'CICLOMOTOR', 'TRAILER', 'SEMIRREMOLQUE', 'MOTO DE AGUA', 'CUATRICICLO'];
    if (vehiclesNotAutoDescription.includes(vehicleType)) {
      if (details && details.length == 0) this.resetDetails(this.Moto);
      return this.Moto;
    }
    else {
      if (details && details.length == 0) this.resetDetails(this.General);
      return this.General;
    }
  }

  private static resetDetails(details: Array<any>) {
    for (let i = 0; i < details.length; i++) {
      details[i].value = undefined;
    }
  }

  public static VerifySelectedAllDetails(detalles_adicionales: any): boolean {
    let result: boolean = true;
    for (let i = 0; i < detalles_adicionales.length; i++) {
      if (detalles_adicionales[i].value === undefined) {
        result = false;
        break;
      }
    }
    return result;
  }
}
