import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Media } from "@ionic-native/media/ngx";
import {File} from "@ionic-native/file/ngx";
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ,Media,
    File, 
    NativeAudio],
  bootstrap: [AppComponent],
})
export class AppModule {}
