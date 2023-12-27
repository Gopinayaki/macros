import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueryBuilderPage } from './query-builder.page';

const routes: Routes = [
  {
    path: '',
    component: QueryBuilderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryBuilderPageRoutingModule {}
