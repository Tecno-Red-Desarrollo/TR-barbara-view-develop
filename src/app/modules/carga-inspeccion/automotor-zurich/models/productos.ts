export class Productos {
  id: number;
  codigo: string;
  nombre: string;
  grupo: string;
  aseguradora: number;

  constructor(id: number, codigo: string, nombre: string, grupo: string, aseguradora: number){
    this.id = id;
    this.codigo = codigo;
    this.nombre = nombre;
    this.grupo = grupo;
    this.aseguradora = aseguradora;
  }
}
