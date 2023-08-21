import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

type LoadingParamType ={
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader!: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController
  ) { }

  public async show({ message }: LoadingParamType) {
     this.loader = await this.loadingController.create({
      message,
      spinner: 'bubbles',
      cssClass: 'global-loading-class'
    });

    this.loader.present();
  }

  public dismiss() {
    this.loader.dismiss();
  }
}
