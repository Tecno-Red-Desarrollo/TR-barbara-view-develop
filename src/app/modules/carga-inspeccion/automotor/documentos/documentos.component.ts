import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  onBasicUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  nextPage() {
    this.router.navigate(['carga-inspeccion/automotor/finalizacion']);
  }

}
