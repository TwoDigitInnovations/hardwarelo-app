import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { ProductCardPageModule } from 'src/app/components/product-card/product-card.module';
// import { NgxPayPalModule } from 'ngx-paypal';
import { SelectDropDownModule } from 'ngx-select-dropdown';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ProductCardPageModule,
    // NgxPayPalModule,
    SelectDropDownModule
  ],
  declarations: [CartPage]
})
export class CartPageModule { }
