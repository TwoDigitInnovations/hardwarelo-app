import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrandListPageRoutingModule } from './brand-list-routing.module';

import { BrandListPage } from './brand-list.page';
import { CarouselCardPageModule } from 'src/app/components/carousel-card/carousel-card.module';
import { CategoriesCardPageModule } from 'src/app/components/categories-card/categories-card.module';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrandListPageRoutingModule,
    CarouselCardPageModule,
    CategoriesCardPageModule,
    ProductCardPageModule
  ],
  declarations: [BrandListPage]
})
export class BrandListPageModule { }
