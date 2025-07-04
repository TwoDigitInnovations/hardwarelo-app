import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandListPage } from './brand-list.page';

const routes: Routes = [
  {
    path: '',
    component: BrandListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandListPageRoutingModule {}
