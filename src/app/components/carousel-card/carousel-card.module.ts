import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarouselCardPageRoutingModule } from './carousel-card-routing.module';

import { CarouselCardPage } from './carousel-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarouselCardPageRoutingModule
  ],
  declarations: [CarouselCardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CarouselCardPage],
})
export class CarouselCardPageModule { }
