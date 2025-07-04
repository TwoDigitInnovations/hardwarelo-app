import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  currentTabs: any
  constructor() { }

  selected(e: any) {
    console.log(e)
    this.currentTabs = e.tab
  }
}
