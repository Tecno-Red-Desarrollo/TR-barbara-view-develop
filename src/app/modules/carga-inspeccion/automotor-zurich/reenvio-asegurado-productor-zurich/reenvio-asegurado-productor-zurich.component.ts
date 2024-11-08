import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Route } from '../helpers/Routes.enum';
import { InspeccionDTO } from '../services/DTOs/inspeccionDTO';
import { InspeccionStorageService } from '../services/inspeccion-storage.service';
import { SendMessagesService } from '../services/send-messages.service';

@Component({
  selector: 'app-reenvio-asegurado-productor-zurich',
  templateUrl: './reenvio-asegurado-productor-zurich.component.html',
  styleUrls: ['./reenvio-asegurado-productor-zurich.component.css']
})
export class ReenvioAseguradoProductorZurichComponent implements OnInit {
  paramsUrl: any = {};
  inspeccionDTO!: InspeccionDTO;
  email!: string;
  phone!: string;

  displaySendingMessage: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private dataService: InspeccionStorageService,
    private sendMessageService: SendMessagesService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getParams();
    this.getInspectionObject();
    console.log("Reenvio al asegurado", this.inspeccionDTO);
  }

  getParams() {
    this.activeRoute.queryParams
      .subscribe(params => {
        this.paramsUrl = params;
        this.email = this.paramsUrl.email;
        this.phone = this.paramsUrl.celular;
      });
  }

  getInspectionObject() {
    this.dataService.source$.subscribe((object: string) => {
      this.inspeccionDTO = JSON.parse(object);
    });
  }

  sendInspectionObject() {
    let _inspeccion = JSON.stringify(this.inspeccionDTO);
    this.dataService.changeSource(_inspeccion);
  }

  sendMail(emailAsegurado: string) {
    let info = this.inspeccionDTO;
    let dataToSendEmail = {
      userId: info._userId,
      repoId: info.idRepo,
      key: info.key,
      aseguradoraId: info.aseguradora,
      token: info._token,
      email_asegurado: emailAsegurado,
      dominio: info.inspeccion.vehiculo.dominio,
      aseguradora_nombre: "Zurich"
    };

    let dataToSendSMS = {
      userId: info._userId,
      repoId: info.idRepo,
      aseguradora_nombre: "Zurich",
      telefono: info.titularTelefono,
      dominio: info.inspeccion.vehiculo.dominio,
      angular: true
    };

    this.displaySendingMessage = true;

    this.sendMessageService.sendMail(dataToSendEmail).subscribe({
      next: (res: any) => {
        console.log("Email enviado", res);
        this.sendMessageService.sendSMS(dataToSendSMS).subscribe({
          next: (res: any) => {
            console.log("SMS enviado", res);
            this.router.navigate([Route.ZURICH_ENDED_PRODUCTOR]);
          },
          error: (err: any) => {
            this.displaySendingMessage = false;
            console.log(err)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el email: ' + err.error.message, life: 5000 });
          }
        });
      },
      error: (err: any) => {
        this.displaySendingMessage = false;
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el email: ' + err.error.message, life: 5000 });
      }
    });
  }
}
