import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { Aseguradora } from 'src/models/aseguradoras/aseguradora';
import { ConfigApp } from 'src/models/aseguradoras/config-app';
import { ApiService } from 'src/services/api.service';
import { AseguradoraService } from 'src/services/aseguradora.service';
import { ConfigAppService } from 'src/services/configApp.service';

@Component({
  selector: 'app-aseguradora',
  templateUrl: './aseguradora.component.html',
  styleUrls: ['./aseguradora.component.css']
})
export class AseguradoraComponent implements OnInit {

  formTitle: string = "Alta";

  loading: boolean = true;
  totalRecords: number = 0;

  configApps: ConfigApp[] = [];

  aseguradora = new Aseguradora();

  configApp = new ConfigApp();


  ngOnInit(): void {
    this.getConfigApp();

      const id = +this.route.snapshot.paramMap.get("id")!;
      if(id > 0) this.loadAseguradora(id);


  };

  constructor(
    private aseguradoraService: AseguradoraService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private configAppService: ConfigAppService
  ) {
    this.loading = false;
    this.totalRecords = -1;
  }

  loadAseguradora(id: number) {
    this.aseguradoraService.getDetailById(id).subscribe((res:any) => {

      if (res) {
        this.formTitle = "Editar";
        this.aseguradora = res;
      }
    });
  }

  getConfigApp() {
    this.configAppService.getConfigApp().subscribe(res => {
      if (res) {
        this.configApps = res;

      }
    });
  }

  editarConfigApp(id: number) {
    this.configAppService.getDetailById(id).subscribe((res:any) => {

      if (res) {
        this.configApp = res;
      }

      console.log(this.configApp);
    });

  }

  loadConfigApp(event: LazyLoadEvent) {
    this.loading = true;
    this.getConfigApp();
    this.loading = false;
  }


  addAseguradora(aseguradora: Aseguradora) {
    this.aseguradoraService.addAseguradora(aseguradora).subscribe({
      next: (res: any) => {
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
          this.router.navigate(["aseguradoras"]);
      },
      error: (err: any) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });
  }

  saveAseguradora(aseguradora: Aseguradora) {
    aseguradora.id > 0 ? this.updateAseguradora(aseguradora) : this.addAseguradora(aseguradora);
  }

  addConfigApp(configApp: ConfigApp) {
    this.configAppService.addConfigApp(configApp).subscribe({
      next: (res: any) => {
          this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
          this.router.navigate(["/aseguradoras"]);
      },
      error: (err: any) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 5000 });
      }
    });
  }

  saveConfigApp(configApp: ConfigApp) {
    configApp.id > 0 ? this.updateConfigApp(configApp) : this.addConfigApp(configApp);
  }

  updateAseguradora(aseguradora: Aseguradora): void {
    this.aseguradoraService.updateAseguradora(aseguradora).subscribe({
      next: (res: any) => {
      this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      this.router.navigate(["/aseguradoras"]);
      },
      error: (err: any) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la Aseguradora: ' + err.error.message, life: 5000 });
      }
    });
  }

  updateConfigApp(configApp: ConfigApp): void {
    this.configAppService.updateConfigApp(configApp).subscribe({
      next: (res: any) => {
      this.messageService.add({ severity:'success', summary: 'Success', detail: res.message, life: 3000 });
      this.router.navigate(["/aseguradoras"]);
      },
      error: (err: any) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la Configuración: ' + err.error.message, life: 5000 });
      }
    });
  }


}
