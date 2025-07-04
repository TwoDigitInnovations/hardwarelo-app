import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  standalone: false,
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {
  ordersData: any = [];
  moment: any = moment;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCoupon();
  }

  goBack() {
    this.navCtrl.back();
  }

  getCoupon() {
    this.common.showLoading();
    this.service.getCoupon().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.ordersData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }



  writeToClipboard = async (e: any) => {
    await Clipboard.write({
      string: `HLO${e}`,
    });
    this.common.presentToaster("Copied to clipboard!")
  };

}
