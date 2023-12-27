import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },



  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'page1',
    loadChildren: () => import('./page1/page1.module').then( m => m.Page1PageModule)
  },
  {
    path: 'query-builder',
    loadChildren: () => import('./query-builder/query-builder.module').then( m => m.QueryBuilderPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'edit-modal',
    loadChildren: () => import('./edit-modal/edit-modal.module').then( m => m.EditModalPageModule)
  },
  {
    path: 'add-item-modal',
    loadChildren: () => import('./add-item-modal/add-item-modal.module').then( m => m.AddItemModalPageModule)
  }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
