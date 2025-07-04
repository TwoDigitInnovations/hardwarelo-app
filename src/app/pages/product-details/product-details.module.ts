import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
    ProductCardPageModule,
  ],
  declarations: [ProductDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsPageModule { }
