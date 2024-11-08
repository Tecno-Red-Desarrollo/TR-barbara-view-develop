import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SpinnerService } from 'src/services/spinner.service';

@Component({
  selector: 'app-layout-barbara',
  templateUrl: './layout-barbara.component.html',
  styleUrls: ['./layout-barbara.component.css']
})
export class LayoutBarbaraComponent implements OnInit {

  environment = environment;

  constructor(public spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
