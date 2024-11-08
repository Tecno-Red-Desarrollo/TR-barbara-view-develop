import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-inspeccion',
  templateUrl: './error-inspeccion.component.html',
  styleUrls: ['./error-inspeccion.component.css']
})
export class ErrorInspeccionComponent implements OnInit {
  error!: any;
  constructor(private activeRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.activeRoute.queryParams
    .subscribe(params => {
      this.error = params;
    });
  }
}
