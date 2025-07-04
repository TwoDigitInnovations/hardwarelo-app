import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { OffersCardPageModule } from 'src/app/components/offers-card/offers-card.module';
import { CategoriesCardPageModule } from 'src/app/components/categories-card/categories-card.module';
import { EssentialsCardPageModule } from 'src/app/components/essentials-card/essentials-card.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';
import { CarouselCardPageModule } from 'src/app/components/carousel-card/carousel-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    OffersCardPageModule,
    CategoriesCardPageModule,
    EssentialsCardPageModule,
    ProductCardPageModule,
    CarouselCardPageModule,
  ],
  declarations: [CategoriesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesPageModule { }
