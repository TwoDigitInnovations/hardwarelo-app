import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { IonicSlides } from '@ionic/angular';
import { HttpParams } from '@angular/common/http';
import { EventService } from 'src/app/event.service';

@Component({
  standalone: false,
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  @ViewChild('popoutBox', { read: ElementRef }) popoutBox: ElementRef | any;
  swiperModules = [IonicSlides];
  options: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass',
    },
  };

  productId: any;
  productIdData: any = {};
  off: any = 0;
  productData: any = [];
  categoriesId: any;
  cartData: any = [];
  sizeData: any = [];
  selectedSlot: any = {};
  selectedColor: any = {};
  discount: any = 0;
  userDetail: any;
  pinCode: any;

  cartTotal: any = 0;
  cartItem: any = 0;
  cartCharge: any = 0;
  deliveryCharge: any;
  mainTotal: any;
  selctedCartItem: any = {};
  deliveryTime: any = '00:00 Hrs'
  newInterval: any
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute,
    private events: EventService,
    private animationCtrl: AnimationController
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.productId = params.pro_id;
    });

    this.events.subscribe('updateComp', (data: any) => {

      const cartData = localStorage.getItem("addCartDetail");
      if (cartData) {
        this.cartData = JSON.parse(cartData)
        this.selctedCartItem = this.cartData.find((f: any) => f._id === this.productIdData?._id)
      } else {
        this.selctedCartItem = {}
      }

    })
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProductById()

    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }

    const cartData = localStorage.getItem("addCartDetail");
    if (cartData) {
      this.cartData = JSON.parse(cartData)
    }
    this.pinCode = localStorage.getItem('pinCode')
  }
  ionViewWillLeave() {
    clearInterval(this.newInterval)
  }

  popOutAnimation(element: HTMLElement) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(1000)
      .easing('ease-out')
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    animation.play();
  }

  getProductById() {
    this.common.showLoading();
    this.service.getProductById(this.productId).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.productIdData = res.data;
        if (this.productIdData?.offer) {
          this.off = Math.round(((this.productIdData?.price * 100) / this.productIdData?.offer) - 100).toFixed(2)
        }
        if (this.productIdData?.varients.length) {
          this.sizeData = this.productIdData?.varients[0];
          this.selectedSlot = this.productIdData?.varients[0]?.size[0];
        }
        this.categoriesId = res?.data?.category?._id;

        if (this.productIdData.discount_type === 'Normal') {
          this.discount = Math.round(this.productIdData?.price - this.productIdData?.offer);
        } else {
          this.discount = Math.round(this.productIdData?.price - (this.productIdData?.price * this.productIdData?.offer / 100));
        }
        this.selctedCartItem = this.cartData.find((f: any) => f._id === this.productIdData?._id)
        this.getProductByCatrgoryId()
        let timeslot = this.productIdData.price_slot.find((f: any) => Number(f.pincode) === Number(this.pinCode))
        console.log(timeslot);
        this.deliveryTime = this.common.convetMinutstoHours(Number(timeslot.delivery_time))
        this.newInterval = setInterval(() => {
          this.popOutAnimation(this.popoutBox.nativeElement);
        }, 1000);
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  getProductByCatrgoryId() {
    this.common.showLoading();
    let pinCode: any = localStorage.getItem('pinCode')
    let data = new HttpParams()
    data = data.append('category', this.categoriesId)
    data = data.append('pincode', pinCode)
    this.service.getProductByCatrgoryId(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.productData = res.data.product;
        // this.common.presentToaster(res?.message)
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
    console.log(this.userDetail?.pincode, this.pinCode)
    const charge = this.productIdData.price_slot.find((f: any) => Number(f.pincode) === (Number(this.userDetail?.pincode) || Number(this.pinCode)))

    if (!c) {
      this.productIdData.qty = Number(charge?.quantity) || 1
      this.productIdData.total = this.discount * (Number(charge?.quantity) || 1),
        this.productIdData.color = this.sizeData?.color,
        this.productIdData.size = this.selectedSlot?.size,
        this.productIdData.charge = charge,
        this.productIdData.discount = this.discount,

        d.push(this.productIdData)
      localStorage.setItem("addCartDetail", JSON.stringify(d));
    }
    console.log(this.cartData);
    console.log(this.productIdData);
    console.log(charge);
    // return
    this.navCtrl.navigateForward(['/tabs/cart']);
    this.events.publish('addToCart', '')
  }

  selectedSlotColor(item: any) {
    this.sizeData = item
    this.selectedSlot = item?.size[0];
  }

  chackQty() {
    this.cartTotal = this.cartData?.reduce(
      (accumulator: any, currentValue: any) => accumulator + Number(currentValue?.total || 0),
      0,
    );

    this.cartItem = this.cartData?.reduce(
      (accumulator: any, currentValue: any) => accumulator + Number(currentValue?.qty || 0),
      0,
    );

    const d = this.cartData.map((f: any) => f.charge?.charge)
    this.cartCharge = Math.max(...d)

    this.pinCode = localStorage.getItem('pinCode')
    this.deliveryCharge = this.cartData?.reduce(
      (accumulator: any, currentValue: any) => {
        // let ver = currentValue.price_slot.find((f: any) => f.pincode === this.pinCode)
        return Number(currentValue.charge.charge) + Number(accumulator || 0)
      },
      0,
    );

    // this.mainTotal = this.deliveryCharge + this.cartTotal;
    this.mainTotal = this.cartCharge + this.cartTotal;
  }

  removeItem(item: any) {
    if (item.qty > item?.charge?.quantity) {
      item.qty = item.qty - 1
      item.total = item.qty * item.discount
    }
    this.chackQty()
    localStorage.setItem('addCartDetail', JSON.stringify(this.cartData))
    this.events.publish('addToCart', '')
  }

  addItem(item: any) {
    item.qty = item.qty + 1
    item.total = item.qty * item.discount
    this.chackQty()
    localStorage.setItem('addCartDetail', JSON.stringify(this.cartData))
    this.events.publish('addToCart', '')
  }
}
