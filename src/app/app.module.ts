import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, iosTransitionAnimation } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalInterceptor } from './interceptors/global.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({ navAnimation: (baseElement, options) => iosTransitionAnimation(baseElement, options) }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
