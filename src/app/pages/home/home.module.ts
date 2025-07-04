import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';
import { OffersCardPageModule } from 'src/app/components/offers-card/offers-card.module';
import { CategoriesCardPageModule } from 'src/app/components/categories-card/categories-card.module';
import { EssentialsCardPageModule } from 'src/app/components/essentials-card/essentials-card.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SuperCategoriesCardPageModule } from 'src/app/components/super-categories-card/super-categories-card.module';
import { CarouselCardPageModule } from 'src/app/components/carousel-card/carousel-card.module';
// import { BrandCardPageRoutingModule } from 'src/app/components/brand-card/brand-card-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ProductCardPageModule,
    OffersCardPageModule,
    CategoriesCardPageModule,
    EssentialsCardPageModule,
    SuperCategoriesCardPageModule,
    CarouselCardPageModule,
    // BrandCardPageRoutingModule
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
