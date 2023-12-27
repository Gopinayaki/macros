import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenService } from './auth/token.service';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';




@NgModule({
  declarations: [ AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,MatButtonToggleModule,NgSelectModule,HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },Camera,File
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  

}
