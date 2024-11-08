import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown } from 'primeng/dropdown';
import { browserRefresh } from 'src/app/app.component';
import { Lugar } from 'src/models/lugar';
import { Provincia } from 'src/models/provincia';
import { ApiService } from 'src/services/api.service';
import { InspeccionDTO } from '../../services/DTOs/inspeccionDTO';
import { InspeccionStorageService } from '../../services/inspeccion-storage.service';

@Component({
  selector: 'app-confirmar-ubicacion',
  templateUrl: './confirmar-ubicacion.component.html',
  styleUrls: ['./confirmar-ubicacion.component.css']
})
export class ConfirmarUbicacionComponent implements OnInit, AfterViewInit {

  provinces: Array<Provincia> = [];
  cities!: Array<any>;
  selectedProvince: any;
  selectedCity: any;
  inspeccionDTO!: InspeccionDTO;
  cp!: Number;
  address!: String;
  idCiudad!: Number;

  coberturaDomicilio = false;

  isLoadingByCP = false;

  displayCheckingCobertura: boolean = false;

  @ViewChild('provinceDropdown') provinceDropdown!: Dropdown;
  @ViewChild('cityDropdown') cityDropdown!: Dropdown;

  constructor(private router: Router, private dataService: InspeccionStorageService, private apiService: ApiService) {
    this.getInspectionObject();
    // Consultamos las provincias para el filtro
    this.apiService.getProvincias().subscribe((res: any) => {
      if (res) {
        this.provinces = res;
      }
    });
  }

  ngAfterViewInit(): void {

    if (this.inspeccionDTO.cp) {
      this.getProvinciaLocalidadByCP();
    } else {
      this.provinceDropdown.selectItem('change', this.provinces[this.provinces.findIndex(p => p.id == this.inspeccionDTO.provincia)]);
    }

  }

  ngOnInit(): void {
    if (browserRefresh) {
      this.router.navigate(['/carga-inspeccion/automotor-zurich/inicio'], {
        queryParams:
        {
          _userId: localStorage.getItem('_userId'),
          idRepo: localStorage.getItem('idRepo'),
          key: localStorage.getItem('key'),
          aseguradora: localStorage.getItem('aseguradora'),
          _token: localStorage.getItem('_token'),
          a: localStorage.getItem('a')
        }
      });
    }
  }


  nextPage() {
    this.router.navigate(['carga-inspeccion/automotor-zurich/presencial/elegir-lugar'], {
      queryParams: {
        dominio: this.inspeccionDTO.inspeccion.vehiculo.dominio,
        marca: this.inspeccionDTO.inspeccion.vehiculo.marca,
        modelo: this.inspeccionDTO.inspeccion.vehiculo.modelo,
        anio: this.inspeccionDTO.inspeccion.vehiculo.anio,
        chasis: this.inspeccionDTO.chasis,
        motor: this.inspeccionDTO.motor,
        nombre: this.inspeccionDTO.titularNombre,
        apellido: this.inspeccionDTO.titularApellido,
        cobertura: this.inspeccionDTO.cobertura,
        email: this.inspeccionDTO.titularEmail,
        cLugar: this.address,
        idRepo: this.inspeccionDTO.idRepo,
        aseguradora: this.inspeccionDTO.aseguradora,
        id_c: this.idCiudad,
        provincia: this.selectedProvince.id,
        localidad: this.selectedCity.id,
        coberturaDomicilio:this.coberturaDomicilio
      }
    });
  }

  getLocalidadesByProvincia() {
    console.log(this.isLoadingByCP)
    if (!this.isLoadingByCP) {
      if (this.inspeccionDTO.provincia && this.inspeccionDTO.localidad) {
        let data = { campo: "provincia", valor: this.selectedProvince.id, cp: this.cp };
        this.apiService.comboLugares(data).subscribe((res: any) => {
          if (res) {
            this.cities = res.localidades;
          }
        });
      }
    } else {
      console.log(this.cities);
      if (this.cities.findIndex(c => c.id == this.inspeccionDTO.localidad) != -1) {
        this.cityDropdown.selectItem('', this.cities[this.cities.findIndex(c => c.id == this.inspeccionDTO.localidad)]);
      } else {
        this.isLoadingByCP = false;
      }
    }
  }

  getProvinciaLocalidadByCP() {
    if (this.inspeccionDTO.cp) {
      this.isLoadingByCP = true;
      let data = { campo: "cp", valor: this.inspeccionDTO.cp, cp: this.inspeccionDTO.cp };
      this.apiService.comboLugares(data).subscribe((res: any) => {
        if (res) {
          console.log(res.localidades);
          this.cities = res.localidades.slice();
          this.selectedProvince = this.provinces[this.provinces.findIndex(p => p.id == res.provincia)];
          this.getLocalidadesByProvincia();
        }
      });
    }
  }

  getCPbyLocalidad() {
    if (this.selectedCity && !this.isLoadingByCP) {
      let data = { campo: "localidad", valor: this.selectedCity.id, cp: this.cp };
      this.apiService.comboLugares(data).subscribe((res: any) => {
        if (res) {
          this.cp = res.cp;
        }
      });
    } else {
      this.isLoadingByCP = false;
    }
  }

  getInspectionObject = () => {
    this.dataService.source$.subscribe((object: string) => {
      this.inspeccionDTO = JSON.parse(object);
      this.cp = this.inspeccionDTO.cp;
      this.address = `${this.inspeccionDTO.calle}  ${this.inspeccionDTO.numero}`;
    });
  }

  checkCobertura() {
    this.displayCheckingCobertura = true;
    setTimeout(() => {
      let data: any = {};
      data.idCiudad = this.selectedCity.id;
      data.cp = this.inspeccionDTO.cp;
      this.apiService.checkCobertura(data).subscribe({
        next: res => {
          if (res) {
            this.displayCheckingCobertura = false;
            if (res.cobertura) {
              this.idCiudad = res.idCiudad;
              this.coberturaDomicilio = true;
            }

            this.nextPage();

          }
        },
        error: err => {
          this.displayCheckingCobertura = false;
        }
      });
    },2000);

  }

}
