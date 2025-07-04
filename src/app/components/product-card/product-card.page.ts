import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { EventService } from 'src/app/event.service';
import { ServiceService } from 'src/app/service.service';
import { AnimationController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-product-card',
  templateUrl: './product-card.page.html',
  styleUrls: ['./product-card.page.scss'],
})
export class ProductCardPage implements OnInit {
  @Input() item: any
  @Input() width: any
  @ViewChild('popoutBox', { read: ElementRef }) popoutBox: ElementRef | any;
  off: any = 0
  cartData: any = [];
  discount: any = 0;
  userDetail: any;
  pinCode: any;
  discountedPrice: any = 0;

  cartTotal: any = 0;
  cartItem: any = 0;
  cartCharge: any = 0;
  deliveryCharge: any;
  mainTotal: any;
  selctedCartItem: any = {}
  timeslot: any = ''
  deliveryTime: any = ""
  newInterval: any

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private events: EventService,
    private animationCtrl: AnimationController
  ) {
    this.events.subscribe('updateComp', (data: any) => {
      this.cartData = [];
      const cartData = localStorage.getItem("addCartDetail");
      if (cartData) {
        this.cartData = JSON.parse(cartData)
        this.selctedCartItem = this.cartData.find((f: any) => f._id === this.item?._id)
      } else {
        this.selctedCartItem = {}
      }

    })
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

  ionViewWillLeave() {
    clearInterval(this.newInterval)
  }


  ngOnInit() {
    // console.log(this.item);

    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }

    const cart = localStorage.getItem("addCartDetail");
    if (cart) {
      this.cartData = JSON.parse(cart)
      if (this.cartData.lenght > 0) {
        this.selctedCartItem = this.cartData.find((f: any) => f._id === this.item?._id)
      }

    }


    this.pinCode = localStorage.getItem('pinCode')
    this.timeslot = this.item.price_slot.find((f: any) => Number(f.pincode) === Number(this.pinCode))
    console.log(this.timeslot);
    this.deliveryTime = this.common.convetMinutstoHours(Number(this.timeslot.delivery_time))
    this.newInterval = setInterval(() => {
      this.popOutAnimation(this.popoutBox.nativeElement);
    }, 1000);
    console.log(this.deliveryTime)
    if (this.item?.offer) {
      if (this.item.discount_type === 'Normal') {
        this.off = Math.round(100 - ((this.item?.price * 100) / (this.item?.price)))
      } else {
        this.off = this.item?.offer
      }
    }

    if (this.item.discount_type === 'Normal') {
      this.discount = Math.round(this.item?.price - this.item?.offer);
    } else {
      this.discount = Math.round(this.item?.price - (this.item?.price * this.item?.offer / 100));
    }
  }

  ionViewWillEnter() { }

  productDetailsPage(id: any) {
    this.navCtrl.navigateForward(['/product-details'], {
      queryParams: { pro_id: id },
    });
  }

  addCart() {
    this.pinCode = localStorage.getItem('pinCode')
    const cartData = localStorage.getItem("addCartDetail");
    console.log(cartData)
    if (cartData) {
      this.cartData = JSON.parse(cartData)
    }

    const d = this.cartData
    const c = this.cartData.find((f: any) => f._id === this.item?._id)
    const charge = this.item.price_slot.find((f: any) => Number(f.pincode) === (Number(this.userDetail?.pincode) || Number(this.pinCode)))
    if (!c) {
      this.item.qty = Number(charge?.quantity) || 1
      this.item.total = this.discount * (Number(charge?.quantity) || 1),
        this.item.charge = charge,
        this.item.discount = this.discount,
        d.push(this.item)
      localStorage.setItem("addCartDetail", JSON.stringify(d));
    }
    this.navCtrl.navigateForward(['/tabs/cart']);
    this.events.publish('addToCart', '')
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
