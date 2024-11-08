import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { DamagePoint } from '../models/damage-point';

@Component({
  selector: 'damage-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
})
export class DamageViewerComponent implements OnInit, AfterViewInit {

  @Input('vehicleTypeId') vehicleTypeId!: number;
  @Input('damagePoints') damagePoints: Array<DamagePoint> = [];
  @Input('viewerClass') viewerClass = 'viewer';
  @Input('backgroundColor') backgroundColor: string = 'transparent';
  @Input('strokeColor') strokeColor: string = '#FFFFF';

  @Output('onDownloadPng') onDownloadEvent = new EventEmitter();

  @ViewChild('damageViewer') damageViewer!: ElementRef;
  @ViewChild('vehicleBackground', { static: true }) background!: ElementRef;
  @Output('figureClick') figureClickEvent = new EventEmitter();

  vehicleSvg: any;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.downloadSvgToPng();

    //Set the background color
    const background = this.background.nativeElement;
    this.renderer.setAttribute(background, 'fill', this.backgroundColor);
  }

  downloadSvgToPng() {
    var svg: any = document.getElementById("vehicle-damage-viewer");
    var svgData = new XMLSerializer().serializeToString(svg);
    var canvas: any = document.createElement("canvas");
    canvas.width = 643;
    canvas.height = 604;

    var ctx = canvas.getContext("2d");
    var img = document.createElement("img");

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      //console.log(canvas.toDataURL("image/png"));
      return this.onDownloadEvent.emit(canvas.toDataURL("image/png"));
    };

    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

  }

  ngAfterViewInit() {
    this.setBackgroundColor();
  }

  setBackgroundColor() {


  }

  onFigureClick(figure: any) {
    return this.figureClickEvent.emit(figure);
  }

}
