import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
//import { vehicle as autoSvg } from '../vehicles/autoSvg.svg'
import { vehicle as autoCoupeSvg } from '../vehicles/autoCoupe.svg'
import { vehicle as autoSvg, vehicleStyles as autoStyle, vehicleId as autoId, frontCar, backCar, leftCar, rightCar, upCar } from '../vehicles/auto/auto.svg'
import { vehicle as camionetaSvg } from '../vehicles/camioneta.svg'
import { vehicle as pickupSimpleSvg } from '../vehicles/pickupSimple.svg'
import { vehicle as pickupDobleSvg } from '../vehicles/pickupDoble.svg'
import { vehicle as utilitarioCerradoSvg } from '../vehicles/utilitarioCerrado.svg'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: '[svg-vehicle]',
  templateUrl: './svg-vehicle.component.html',
  styleUrls: ['./svg-vehicle.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SvgVehicleComponent implements OnInit {

  @Input('vehicleTypeId') vehicleTypeId!: number;
  svgContent!: SafeHtml;
  svgContentStyle!: SafeHtml;
  svgContentLeft!: SafeHtml;
  svgContentRight!: SafeHtml;
  svgContentUp!: SafeHtml;
  svgContentFront!: SafeHtml;
  svgContentBack!: SafeHtml;
  @Input('strokeColor') strokeColor: string = '#FFFFFF';
  @Output('figureClick') figureClickEvent = new EventEmitter()

  vehicleId: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadSvg();
  }

  loadSvg() {

    const setStrokeColor = (svg: string) => {
      return svg.replace(/stroke:#FFFFFF/g, `stroke:${this.strokeColor}`);
    }

    const buildSvgContent = (svg: string) => {

      return this.sanitizer.bypassSecurityTrustHtml(setStrokeColor(svg));
    }

    switch (this.vehicleTypeId) {
      case 1:
        this.vehicleId = autoId;
        this.svgContentStyle = buildSvgContent(autoStyle);
        this.svgContentLeft = buildSvgContent(leftCar);
        this.svgContentRight = buildSvgContent(rightCar);
        this.svgContentUp = buildSvgContent(upCar);
        this.svgContentFront = buildSvgContent(frontCar);
        this.svgContentBack = buildSvgContent(backCar);

        break;
      case 2:
        this.svgContent = buildSvgContent(autoCoupeSvg)
        break;
      case 3:
        this.svgContent = buildSvgContent(utilitarioCerradoSvg);
        break;
      case 4:
        this.svgContent = buildSvgContent(utilitarioCerradoSvg);
        break;
      case 5:
        this.svgContent = buildSvgContent(autoSvg);
        break;
      case 6:
        this.svgContent = buildSvgContent(pickupSimpleSvg);
        break;
      case 7:
        this.svgContent = buildSvgContent(pickupDobleSvg);
        break;
      case 8:
        this.svgContent = buildSvgContent(camionetaSvg);
        break;
      default:
        this.svgContent = buildSvgContent(autoSvg);
    }
  }

  onFigureClick(figure: string) {
    return this.figureClickEvent.emit(figure)
  }

}
