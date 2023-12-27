import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {
  searchQuery: string = '';

  tableData: any[] = [
    {
      sno: 1,
      macroName: 'Macro 1',
      tagNo: 'Tag 1',
      description: 'Description 1',
      conditionMet: true,
      priority: 'High',
      comment: 'Comment 1',
      operatorId: 'Operator 1'
    },
    {
      sno: 2,
      macroName: 'Macro 2',
      tagNo: 'Tag 2',
      description: 'Description 2',
      conditionMet: false,
      priority: 'Medium',
      comment: 'Comment 2',
      operatorId: 'Operator 2'
    },
    {
      sno: 3,
      macroName: 'Macro 3',
      tagNo: 'Tag 3',
      description: 'Description 3',
      conditionMet: true,
      priority: 'Low',
      comment: 'Comment 3',
      operatorId: 'Operator 3'
    }
  ];
  



}
