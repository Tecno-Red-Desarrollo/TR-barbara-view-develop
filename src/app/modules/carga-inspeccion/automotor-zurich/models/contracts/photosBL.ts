import { DetailsAdditional } from "../../helpers/DetailsAdditionalHelper";
import { ConfiguracionFoto } from "../configuracion-foto";
import { DetalleVehiculo } from "../detalle-vehiculo";
import { Foto } from "../foto";

export class PhotosBL {
  private static AUTO_GENERAL = ['AUTOMOVIL 4/5 P', 'AUTOMOVIL COUPE 2/3 P', 'CAMIONETA', 'PICK-UP CABINA DOBLE', 'PICK-UP'];
  private static MOTO_GENERAL = ['MOTO'];

  public static SetAllPhotoConfigurations(photos: Array<ConfiguracionFoto>, details: Array<DetalleVehiculo>): Array<ConfiguracionFoto> {
    // let photoConfigurations = photos.filter(x => {
    //   return (x.tipo === "Carrocería" || x.tipo === "Carroceria")
    // });

    // se usó un filter porque en el array hay contenidos nulos debido a que en el componente detalle-vehiculo se asigna
    // el index 3 (caso VTV) y por ende, se entendía que el array tiene 4 objetos. Lo tengo que arreglar de otra forma.
    let detailsFiltered = details.filter(x => x != null);

    for (let i = 0; i < detailsFiltered.length; i++) {
      if (detailsFiltered[i].posee) {
        // photoConfigurations.push(DetailsAdditional.get(detailsFiltered[i].descripcion))
        photos.push(DetailsAdditional.get(detailsFiltered[i].descripcion))
      }
    }
    return photos;
    // return photoConfigurations;
  }

  public static ValidateCompleteMandatoryImages(configurationPhotos: Array<ConfiguracionFoto>, photos: Array<Foto>): boolean {
    let imagesComplete: boolean = true;
    for (let i = 0; i < configurationPhotos.length; i++) {
      if (configurationPhotos[i].obligatoria) {
        if (photos[i] == undefined) {
          imagesComplete = false;
        }
      }
    }
    return imagesComplete;
  }

  public static putIndicativePicture(archivo: string, tipoVehiculo: string): string {
    let indicative_picture = "";
    if (this.AUTO_GENERAL.includes(tipoVehiculo)) {
      indicative_picture = `./assets/indicative_pictures/auto/${archivo}.png`
    }
    else if (this.MOTO_GENERAL.includes(tipoVehiculo)) {
      if (archivo == 'lateral_conductor') archivo = 'lateral_derecho';
      if (archivo == 'lateral_acompanante') archivo = 'lateral_izquierdo';
      indicative_picture = `./assets/indicative_pictures/moto/${archivo}.png`
    } else {
      indicative_picture = `./assets/indicative_pictures/auto/${archivo}.png`
    }
    return indicative_picture;
  }

  /* Pendiente separar la lógica de negocio de servicios */
  // public static SetInitialPhotoConfigurations(photos: Array<Foto>, cobertura: string, type_vehicle: string): Array<string> {
  //   let configFotosToInspection: Array<any> = [];
  //   //Guardo las configuraciones de fotos fijas (las que siempre te van a pedir sin importar la cobertura que tenga).
  //   let configFotos_fix = this.SetPhotoConfigurationsByDefault(photos);
  //   configFotosToInspection = configFotos_fix;

  //   //Obtengo las otras configuraciones de fotos para luego filtrarlas por el tipo de cobertura.
  //   let configFotosToValidate = this.setConfigFotosNotDefault(photos, configFotos_fix, type_vehicle);
  //   let configfotos_coverage = this.filterFotosByCoberturas(configFotosToValidate, cobertura);

  //   //Guardo todos los configFotos según cobertura que posea
  //   for(let i=0; i< configfotos_coverage.length; i++){
  //     configFotosToInspection.push(configfotos_coverage[i]);
  //   }
  //   configFotosToInspection = this.SetPhotoConfigurationLabelsByTypeVehicle(configFotosToInspection, type_vehicle);

  //   return configFotosToInspection;
  // }

  private static SetPhotoConfigurationsByDefault(photos: Array<Foto>) {
    // return photos;
  }

  private static FilterPhotoConfigurationsByCoberturas(photos: Array<Foto>, cobertura: string) {

  }

  private static SetPhotoConfigurationLabelsByTypeVehicle(photos: Array<Foto>, cobertura: string) {

  }
}
