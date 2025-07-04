import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarouselCardPage } from './carousel-card.page';

const routes: Routes = [
  {
    path: '',
    component: CarouselCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarouselCardPageRoutingModule {}
