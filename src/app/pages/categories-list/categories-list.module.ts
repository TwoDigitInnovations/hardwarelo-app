import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesListPageRoutingModule } from './categories-list-routing.module';

import { CategoriesListPage } from './categories-list.page';
import { CategoriesCardPageModule } from 'src/app/components/categories-card/categories-card.module';
import { CarouselCardPageModule } from 'src/app/components/carousel-card/carousel-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesListPageRoutingModule,
    CategoriesCardPageModule,
    CarouselCardPageModule,
  ],
  declarations: [CategoriesListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesListPageModule { }
