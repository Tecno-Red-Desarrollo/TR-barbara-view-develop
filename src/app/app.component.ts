import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  subscription!: Subscription;

  constructor(private config: PrimeNGConfig, private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  title = 'barbara-prime';

  ngOnInit() {
    this.config.setTranslation({
      "dayNames": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      "dayNamesShort": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      "dayNamesMin": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      "monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      "today": "Hoy",
      "clear": "Borrar",
      //translations
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
