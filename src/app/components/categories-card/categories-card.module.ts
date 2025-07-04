import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesCardPageRoutingModule } from './categories-card-routing.module';

import { CategoriesCardPage } from './categories-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesCardPageRoutingModule
  ],
  declarations: [CategoriesCardPage],
  exports: [CategoriesCardPage]
})
export class CategoriesCardPageModule { }
