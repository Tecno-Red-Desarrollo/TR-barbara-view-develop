import { Router } from "@angular/router";
import { ChannelHelper } from "../helpers/ChannelHelpers";

export class InspeccionService {

  constructor(private router: Router) {}

  public ByChannel(channel: number, isAsegurado?: boolean, params?: any): any{
    if(!isAsegurado){
      this.router.navigate(ChannelHelper.setRoute(channel), { queryParams:
        {
          email: params.titularEmail,
          celular: params.titularTelefono,
          enableSendMailToAsegurado: params.enableSendMail
        }
      });
    }
    else {
      this.router.navigate(ChannelHelper.setRoute(channel), { queryParams:
        {
          email: params.titularEmail,
          celular: params.titularTelefono,
          enableSendMailToAsegurado: params.enableSendMail
        }
      });
    }
  }
}
