import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

import { ImageParamsStorageService } from '../services/imageParams-storage.service';

@Component({
  selector: 'app-camara-zurich',
  templateUrl: './camara-zurich.component.html',
  styleUrls: ['./camara-zurich.component.css'],
})
export class CamaraZurichComponent implements OnDestroy, OnInit {
  // @Output() getPicture = new EventEmitter<WebcamImage>();
  private ngUnsubscribe = new Subject();
  width!: number;
  height!: number;
  maskWidth!: number;
  display: boolean = true;

  mask: string = '';
  routeMask: string = '';
  toRoute: string = '';
  componentName: string = '';
  imageId: string = '';
  titleImage: string = '';
  mirrorImage: string = 'never';
  showWebcam = true;
  isCameraExist = true;
  public webcamImage?: WebcamImage;
  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  imageAsBase64: any = {};

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private servicioImageParam: ImageParamsStorageService
  ) {}

  ngOnInit(): void {
    console.log('camara on init');
    this.activeRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.routeMask = params['routeMask'];
        this.toRoute = params['route'];
        this.componentName = params['component'];
        this.titleImage = params['title'];
        this.imageId = params['imageId'];
      });
    //this.enableVideo();
    this.setMask();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initWebcam();
    }, 2000);
  }

  initWebcam() {
    this.initWebcamWidth();
    this.matchMaskToVideoWitdh();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    !!event ? (event.target as Window) : window;
    //console.log('onResize event ' + new Date().getMilliseconds());
    setTimeout(() => {
      this.initWebcam();
    }, 1000);
  }

  private initWebcamWidth() {
    //console.log('INIT WEBCAM:');
    let videoElement = document.querySelector('video');
    // console.log('Webcam width (intrinsic)' + videoElement?.videoWidth);
    // console.log('Webcam height (intrinsic)' + videoElement?.videoHeight);
    // console.log('Video width' + videoElement?.width);
    // console.log('Video height' + videoElement?.height);
    // console.log('Window width' + window.innerWidth);
    // console.log('Window height' + window.innerHeight);
    if (videoElement != undefined && videoElement.videoWidth != undefined && videoElement.videoWidth != 0) {
      if (videoElement.videoWidth < window.innerWidth) {
        this.width = videoElement.videoWidth;
        this.height = videoElement.videoHeight;
      } else {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      }
    } else {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
    //console.log("setting this.width x this.height to " + this.width + " x " + this.height);
  }

  private matchMaskToVideoWitdh() {
    // if (window.matchMedia("(orientation: landscape)").matches) {
      let videoElement = document.querySelector('video');
      if (videoElement != undefined && videoElement.videoWidth != undefined && videoElement.videoWidth != 0) {
        if (videoElement.videoWidth < window.innerWidth) {
          this.maskWidth = videoElement.videoWidth;
        } else {
          this.maskWidth = window.innerWidth;
        }
      } else {
        this.maskWidth = window.innerWidth;
      }
      //console.log("setting this.mastkWidth to " + this.maskWidth);
    }

  enableVideo(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );
  }

  /* se desactiva momentaneamente */
  getButtonsDivMarginTop(buttonsDiv : any) {
    let marginTop = "-4rem";
    //console.log('Buttons margin-top: ' + marginTop);
    return marginTop;
  }

  triggerSnapshot(): void {
    console.log('snapshot!')
    this.trigger.next();
    //Escondo la cámara y muestro la foto con los botones confirmar y cancelar
    this.isCameraExist = false;
    this.display = false;
    this.imageAsBase64 = this.webcamImage?.imageAsBase64;
  }

  handleImage = (webcamImage: WebcamImage) => (this.webcamImage = webcamImage);

  changeWebCame = (directionOrDeviceId: boolean | string) =>
    this.nextWebcam.next(directionOrDeviceId);

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  sendImageAsBase64 = () =>
    this.servicioImageParam.changeSource([
      this.imageAsBase64,
      this.componentName,
      this.titleImage,
      this.imageId,
    ]);

  setMask(): string {
    let routeImage = '';
    if (this.display) {
      if (this.mask != 'none') {
        return this.routeMask;
      }
    }
    return routeImage;
  }

  rotateMask() {
    if (!(window.matchMedia("(orientation: landscape)")).matches) {
      //console.log('rotate 90')
      return "90deg";
    } else {
      return "";
    }
  }

  confirm(route: string) {
    this.sendImageAsBase64();
    this.router.navigate([route]);
  }

  backToSnapShot() {
    this.isCameraExist = true;
    this.display = true;
  }

  backToComponent(route: string) {
    this.router.navigate([route]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
