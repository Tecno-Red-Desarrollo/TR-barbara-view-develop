import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
declare var swal: any;

@Injectable()
export class NotificationService {

    durationInSeconds = 2;

    constructor(private messageService:MessageService) { }

    // On Success
    onSuccess($body: any) {
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    }

}
