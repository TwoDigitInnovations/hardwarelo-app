import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersDetailsPageRoutingModule } from './orders-details-routing.module';

import { OrdersDetailsPage } from './orders-details.page';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersDetailsPageRoutingModule,
    ProductCardPageModule,
  ],
  declarations: [OrdersDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdersDetailsPageModule { }
