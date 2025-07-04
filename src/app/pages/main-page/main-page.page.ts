import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  isAlertOpen = false;
  pinCode: any = '';
  submitted: any = false;
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  signIn() {
    this.navCtrl.navigateForward(['/sign-in'])
  }

  canutian() {
    if (this.pinCode === '') {
      this.common.presentToaster('Pin Code is required.')
      return
    }

    // return
    localStorage.setItem('pinCode', this.pinCode)
    this.isAlertOpen = false;
    setTimeout(() => {
      this.navCtrl.navigateForward(['/tabs/home'])
    }, 200);
    this.pinCode = '';
  }

}
