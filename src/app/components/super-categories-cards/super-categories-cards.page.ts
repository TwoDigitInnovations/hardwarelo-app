import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-super-categories-cards',
  templateUrl: './super-categories-cards.page.html',
  styleUrls: ['./super-categories-cards.page.scss'],
})
export class SuperCategoriesCardsPage implements OnInit {
  @Input() items: any;

  constructor() { }

  ngOnInit() {
    console.log(this.items)
  }

}
