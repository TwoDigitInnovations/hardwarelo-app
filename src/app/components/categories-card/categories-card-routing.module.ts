import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesCardPage } from './categories-card.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesCardPageRoutingModule {}
