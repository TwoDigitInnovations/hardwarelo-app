import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperCategoriesCardsPageRoutingModule } from './super-categories-cards-routing.module';

import { SuperCategoriesCardsPage } from './super-categories-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperCategoriesCardsPageRoutingModule
  ],
  declarations: [SuperCategoriesCardsPage],
  exports: [SuperCategoriesCardsPage]
})
export class SuperCategoriesCardsPageModule { }
