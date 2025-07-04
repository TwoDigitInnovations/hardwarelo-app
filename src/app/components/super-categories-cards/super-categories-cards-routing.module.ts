import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperCategoriesCardsPage } from './super-categories-cards.page';

const routes: Routes = [
  {
    path: '',
    component: SuperCategoriesCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperCategoriesCardsPageRoutingModule {}
