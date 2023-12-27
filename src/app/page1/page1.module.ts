import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Page1PageRoutingModule } from './page1-routing.module';

import { Page1Page } from './page1.page';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgSelectModule } from '@ng-select/ng-select';





@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    Page1PageRoutingModule, MatButtonToggleModule,NgSelectModule,
    ReactiveFormsModule
  ],
  declarations: [Page1Page]
})
export class Page1PageModule {}
