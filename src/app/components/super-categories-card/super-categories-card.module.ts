import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperCategoriesCardPageRoutingModule } from './super-categories-card-routing.module';

import { SuperCategoriesCardPage } from './super-categories-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperCategoriesCardPageRoutingModule
  ],
  declarations: [SuperCategoriesCardPage],
  exports: [SuperCategoriesCardPage]
})
export class SuperCategoriesCardPageModule { }
