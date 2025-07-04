import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperCategoriesPageRoutingModule } from './super-categories-routing.module';

import { SuperCategoriesPage } from './super-categories.page';
import { SuperCategoriesCardsPageModule } from 'src/app/components/super-categories-cards/super-categories-cards.module';
import { CarouselCardPageModule } from 'src/app/components/carousel-card/carousel-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperCategoriesPageRoutingModule,
    SuperCategoriesCardsPageModule,
    CarouselCardPageModule,
  ],
  declarations: [SuperCategoriesPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SuperCategoriesPageModule { }
