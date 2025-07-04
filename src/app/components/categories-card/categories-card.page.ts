import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-categories-card',
  templateUrl: './categories-card.page.html',
  styleUrls: ['./categories-card.page.scss'],
})
export class CategoriesCardPage implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit() {
    console.log(this.item)
  }

  ionViewWillEnter() {
    console.log(this.item)
  }

}
