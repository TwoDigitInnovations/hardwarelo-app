import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userDetail: any;
  isAlertOpen = false;
  isAlertOpen2 = false;
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  userProfilePage() {
    this.navCtrl.navigateForward(['/profile'])
  }

  ordersPage() {
    this.navCtrl.navigateForward(['/orders'])
  }

  queriesPage() {
    this.navCtrl.navigateForward(['/queries'])
  }

  couponPage() {
    this.navCtrl.navigateForward(['/coupon'])
  }

  privacyPolicy() {
    window.open('https://hardwarelo.com/privacy-policy', '_black');
    // this.navCtrl.navigateForward(['/privacy-policy'])
  }

  termsAndConditionsPage() {
    window.open('https://hardwarelo.com/terms', '_black');
    // this.navCtrl.navigateForward(['/terms-and-conditions'])
  }


  logout() {
    this.isAlertOpen = false;
    this.isAlertOpen2 = false;
    setTimeout(() => {
      localStorage.clear()
      this.navCtrl.navigateRoot(['/main-page'])
    }, 200);
  }
}
