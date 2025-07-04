import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-offers-card',
  templateUrl: './offers-card.page.html',
  styleUrls: ['./offers-card.page.scss'],
})
export class OffersCardPage implements OnInit {
  @Input() item: any
  off: any = 0
  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(this.item)
  }
}
