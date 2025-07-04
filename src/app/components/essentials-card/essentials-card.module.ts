import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EssentialsCardPageRoutingModule } from './essentials-card-routing.module';

import { EssentialsCardPage } from './essentials-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EssentialsCardPageRoutingModule
  ],
  declarations: [EssentialsCardPage],
  exports: [EssentialsCardPage]
})
export class EssentialsCardPageModule { }
