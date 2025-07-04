import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperCategoriesCardPage } from './super-categories-card.page';

const routes: Routes = [
  {
    path: '',
    component: SuperCategoriesCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperCategoriesCardPageRoutingModule {}
