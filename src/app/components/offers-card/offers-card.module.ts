import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersCardPageRoutingModule } from './offers-card-routing.module';

import { OffersCardPage } from './offers-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersCardPageRoutingModule
  ],
  declarations: [OffersCardPage],
  exports: [OffersCardPage]
})
export class OffersCardPageModule { }
