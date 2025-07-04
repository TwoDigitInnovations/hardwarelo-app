import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-brand-list',
  templateUrl: './brand-list.page.html',
  styleUrls: ['./brand-list.page.scss'],
})
export class BrandListPage implements OnInit {
  userDetail: any;
  pinCode: any;
  brandName: any;
  brandId: any;
  brandData: any = [];
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.brandName = params.brand_name
      this.brandId = params.id;
      if (this.brandId) {
        this.getProductByBrandId()
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    this.pinCode = localStorage.getItem('pinCode')
  }

  goBack() {
    this.navCtrl.back();
  }

  profilePage() {
    this.navCtrl.navigateForward(['/profile']);
  }

  loginPage() {
    this.navCtrl.navigateForward(['/sign-in']);
  }

  getProductByBrandId() {
    this.common.showLoading();
    this.service.getProductByBrandId(this.brandId).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.brandData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }
}
