import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueryBuilderPageRoutingModule } from './query-builder-routing.module';

import { QueryBuilderPage } from './query-builder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueryBuilderPageRoutingModule
  ],
  declarations: [QueryBuilderPage]
})
export class QueryBuilderPageModule {}
