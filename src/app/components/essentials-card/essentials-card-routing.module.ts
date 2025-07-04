import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EssentialsCardPage } from './essentials-card.page';

const routes: Routes = [
  {
    path: '',
    component: EssentialsCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EssentialsCardPageRoutingModule {}
