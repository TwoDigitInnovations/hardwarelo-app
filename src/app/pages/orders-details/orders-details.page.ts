import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { HttpParams } from '@angular/common/http';
import { IonicSlides } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-orders-details',
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
})
export class OrdersDetailsPage implements OnInit {
  swiperModules = [IonicSlides];
  options: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass',
    },
  };

  ordersId: any;
  productId: any;
  productIdData: any = {};
  off: any = 0;
  productData: any = [];
  categoriesId: any;
  cartData: any = [];
  sizeData: any = [];
  selectedSlot: any = {};
  selectedColor: any = {};
  mainProductIdData: any = {}
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.ordersId = params.ord_id;
      this.productId = params.product_id
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProductRequest()
  }

  getProductRequest() {
    this.common.showLoading();
    this.service.getProductRequest(this.ordersId).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.mainProductIdData = res.data;
        this.productIdData = res.data.productDetail.find((f: any) => f._id === this.productId)
        if (this.productIdData?.product?.offer) {
          this.off = Math.round(((this.productIdData?.product?.price * 100) / this.productIdData?.product?.offer) - 100).toFixed(2)
        }
        if (this.productIdData?.product?.varients.length) {
          this.sizeData = this.productIdData?.product?.varients[0];
          this.selectedSlot = this.productIdData?.product?.varients[0]?.size[0];
        }
        this.categoriesId = res?.data?.category?._id;
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  goBack() {
    this.navCtrl.back();
  }

  cartPage() {
    const addCartData = localStorage.getItem("addCartDetail");
    if (addCartData) {
      this.cartData = JSON.parse(addCartData)
    }

    const d = this.cartData
    const c = this.cartData.find((f: any) => f._id === this.productIdData?._id)
    if (!c) {
      this.productIdData.qty = 1
      this.productIdData.total = this.productIdData.price,
        this.productIdData.color = this.sizeData?.color
      d.push(this.productIdData)
      localStorage.setItem("addCartDetail", JSON.stringify(d));
    }
    this.navCtrl.navigateForward(['/tabs/cart']);
  }

  selectedSlotColor(item: any) {
    this.sizeData = item
    this.selectedSlot = item?.size[0];
  }
}
