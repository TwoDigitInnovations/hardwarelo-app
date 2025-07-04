import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { IonicSlides } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  options: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass',
    },
  };

  productData: any = [];
  categoryData: any = [];
  settingData: any = [];
  userDetail: any;
  pinCode: any;
  off: any;
  superCategoryData: any = [];
  brandData: any = [];
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    this.pinCode = localStorage.getItem('pinCode')
    this.getProduct();
    this.getCategory()
    this.getsetting()
    this.getSuperCategory()
    this.getBrand()
  }

  getProduct() {
    this.common.showLoading();
    this.service.getProduct().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.productData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  getCategory() {
    this.common.showLoading();
    this.service.getCategory().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.categoryData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  getSuperCategory() {
    this.common.showLoading();
    this.service.getSuperCategory().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.superCategoryData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  getsetting() {
    this.common.showLoading();
    this.service.getsetting().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.settingData = res.setting[0]?.carousel;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  productViewPage() {
    this.navCtrl.navigateForward(['/tabs/product-view']);
  }

  brandPage() {
    this.navCtrl.navigateForward(['/tabs/brand']);
  }

  categoriesPage() {
    // this.navCtrl.navigateForward(['/tabs/categories']);
    this.navCtrl.navigateForward(['/tabs/super-categories']);
  }

  profilePage() {
    this.navCtrl.navigateForward(['/profile']);
  }

  loginPage() {
    this.navCtrl.navigateForward(['/sign-in']);
  }

  gotoCategory(item: any) {
    this.navCtrl.navigateForward(['/tabs/product-view'], {
      queryParams: { cat_id: item.name, type: 'categories' },
    });
  }

  categoriesCardPage(item: any) {
    // this.navCtrl.navigateForward(['/tabs/product-view'], {
    //   queryParams: { cat_id: item.name, type: 'categories' },
    // });
    this.navCtrl.navigateForward(['/tabs/categories-list'], {
      queryParams: { cat_id: item.name, id: item._id, type: 'categories' },
    });
  }

  getBrand() {
    this.common.showLoading();
    this.service.getBrand().subscribe(
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

  brandListPage(item: any) {
    this.navCtrl.navigateForward(['/tabs/brand-list'], {
      queryParams: { brand_name: item.name, id: item._id, type: 'brand' },
    });
  }
}
