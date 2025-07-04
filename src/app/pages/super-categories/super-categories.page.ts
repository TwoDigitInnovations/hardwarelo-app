import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicSlides, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';


@Component({
  standalone: false,
  selector: 'app-super-categories',
  templateUrl: './super-categories.page.html',
  styleUrls: ['./super-categories.page.scss'],
})
export class SuperCategoriesPage implements OnInit {
  swiperModules = [IonicSlides];
  options: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass',
    },
  };
  userDetail: any;
  pinCode: any;
  serchData: any = '';
  settingData: any = [];
  categoriesId: any;
  productData: any = [];
  categoryData: any = [];
  categoriesName: any;
  superCategoryData: any = [];

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.categoriesName = params.cat_id
      this.categoriesId = params.id;
      if (this.categoriesId) {
        this.getCategoryBysuperCategoryId()
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
    this.getsetting();
    this.getAllSuperCategoryWithCategory();
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

  gotoCategory(item: any) {
    this.navCtrl.navigateForward(['/tabs/product-view'], {
      queryParams: { cat_id: item.name, type: 'categories' },
    });
  }

  productsearch() {
    this.common.showLoading();
    this.service.productsearch(this.serchData).subscribe(
      (res: any) => {
        this.common.hideLoading();
        // this.productData = res.data;
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

  getCategoryBysuperCategoryId() {
    this.common.showLoading();
    this.service.getCategoryBysuperCategoryId(this.categoriesId).subscribe(
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

  getAllSuperCategoryWithCategory() {
    this.common.showLoading();
    this.service.getAllSuperCategoryWithCategory().subscribe(
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
}
