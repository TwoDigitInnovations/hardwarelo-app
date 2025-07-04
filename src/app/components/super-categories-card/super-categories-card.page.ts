import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-super-categories-card',
  templateUrl: './super-categories-card.page.html',
  styleUrls: ['./super-categories-card.page.scss'],
})
export class SuperCategoriesCardPage implements OnInit {
  @Input() item: any
  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.item)
  }
}
