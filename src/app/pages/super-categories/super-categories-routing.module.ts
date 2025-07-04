import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperCategoriesPage } from './super-categories.page';

const routes: Routes = [
  {
    path: '',
    component: SuperCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperCategoriesPageRoutingModule {}
