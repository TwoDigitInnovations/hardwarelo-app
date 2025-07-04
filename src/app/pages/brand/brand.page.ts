import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-brand',
  templateUrl: './brand.page.html',
  styleUrls: ['./brand.page.scss'],
})
export class BrandPage implements OnInit {
  userDetail: any;
  pinCode: any;
  productWithBrandData: any = [];
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail');
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail);
    }
    this.pinCode = localStorage.getItem('pinCode');
    this.getAllProductWithBrand();
  }

  goBack() {
    this.navCtrl.back();
  }

  loginPage() {
    this.navCtrl.navigateForward(['/sign-in']);
  }

  profilePage() {
    this.navCtrl.navigateForward(['/profile']);
  }

  getAllProductWithBrand() {
    this.common.showLoading();
    this.service.getAllProductWithBrand().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.productWithBrandData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  brandListPage(item: any) {
    this.navCtrl.navigateForward(['/tabs/brand-list'], {
      queryParams: { brand_name: item.name, id: item._id, type: 'brand' },
    });
  }
}
