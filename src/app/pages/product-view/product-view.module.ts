import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductViewPageRoutingModule } from './product-view-routing.module';

import { ProductViewPage } from './product-view.page';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselCardPageModule } from 'src/app/components/carousel-card/carousel-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductViewPageRoutingModule,
    ProductCardPageModule,
    CarouselCardPageModule,
  ],
  declarations: [ProductViewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductViewPageModule { }
