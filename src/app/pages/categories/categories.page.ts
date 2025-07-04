import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicSlides, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  swiperModules = [IonicSlides];
  options: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass',
    },
  };

  categoryData: any = [];
  settingData: any = [];
  popularCategoryData: any = [];
  userDetail: any;
  serchData: any = '';
  pinCode: any;

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private ref: ChangeDetectorRef
  ) {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
  }

  ngOnInit() { }

  ionViewWillEnter() {
    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }
    this.pinCode = localStorage.getItem('pinCode')
    this.getCategory()
    this.getsetting()
    this.getPopularCategory()
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

  getCategoryBySearch() {
    this.common.showLoading();
    this.service.getCategoryBySearch(this.serchData).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.popularCategoryData = res.data;
        this.ref.detectChanges()
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

  getPopularCategory() {
    this.common.showLoading();
    this.service.getPopularCategory().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.popularCategoryData = res.data;
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  productViewPage(id: any) {
    this.navCtrl.navigateForward(['/tabs//product-view'], {
      queryParams: { cat_id: id, type: 'categories' },
    });
  }

  profilePage() {
    this.navCtrl.navigateForward(['/profile']);
  }

  loginPage() {
    this.navCtrl.navigateForward(['/sign-in']);
  }

  productsearch() {
    return
    this.common.showLoading();
    this.service.productsearch(this.serchData).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.popularCategoryData = [{ products: res.data }];
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
