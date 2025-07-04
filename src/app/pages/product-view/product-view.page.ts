import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicSlides, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {
  swiperModules = [IonicSlides];
  options: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass',
    },
  };

  productData: any = [];
  settingData: any = [];
  categoriesId: any;
  userDetail: any;
  serchData: any = '';
  pinCode: any;
  bannerList: any = [];

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.categoriesId = params.cat_id;
      if (params?.type) {
        this.getProductByCatrgoryId()
      } else {
        this.getProduct()
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
    // this.getProduct()
    this.getsetting()
  }

  goBack() {
    this.navCtrl.back();
  }

  getProductByCatrgoryId() {
    this.common.showLoading();
    let pinCode: any = localStorage.getItem('pinCode')
    let data = new HttpParams()
    data = data.append('category', this.categoriesId)
    data = data.append('pincode', pinCode)
    if (this.serchData) {
      data = data.append('key', this.serchData)
    }

    this.service.getProductByCatrgoryId(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.productData = res.data.product;
        // if (res.data?.length > 0) {
        this.bannerList = res.data.category.banner
        // }
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
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

  profilePage() {
    this.navCtrl.navigateForward(['/profile']);
  }

  loginPage() {
    this.navCtrl.navigateForward(['/sign-in']);
  }

  productsearch() {
    this.common.showLoading();
    this.service.productsearch(this.serchData).subscribe(
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
}
