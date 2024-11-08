export class Score {
  barbara_id: number;
  puntaje_facilidad: number;
  puntaje_recomendacion: number;

  constructor(barbara_id: number, puntaje_facilidad: number, puntaje_recomendacion: number){
    this.barbara_id = barbara_id;
    this.puntaje_facilidad = puntaje_facilidad;
    this.puntaje_recomendacion = puntaje_recomendacion;
  }
}
