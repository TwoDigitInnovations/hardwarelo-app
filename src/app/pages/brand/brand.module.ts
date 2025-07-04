import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandPageRoutingModule } from './brand-routing.module';

import { BrandPage } from './brand.page';
import { CarouselCardPageModule } from 'src/app/components/carousel-card/carousel-card.module';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandPageRoutingModule,
    CarouselCardPageModule,
    ProductCardPageModule
  ],
  declarations: [BrandPage]
})
export class BrandPageModule { }
