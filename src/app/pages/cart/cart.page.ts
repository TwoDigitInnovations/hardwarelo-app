import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, AnimationController, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { contryCode } from 'src/app/contryCode';
import { ServiceService } from 'src/app/service.service';
import { Checkout } from 'capacitor-razorpay';
import { EventService } from 'src/app/event.service';

@Component({
  standalone: false,
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  // @ViewChild('popoutBox', { read: ElementRef }) popoutBox: ElementRef | any;
  @ViewChildren('popoutBox') popoutBox: QueryList<ElementRef> | any;
  cartData: any = [];
  productData: any = [];
  cartTotal: any = 0;
  cartItem: any = 0;
  cartCharge: any = 0;
  isAlertOpen = false;
  shippingAddressModel: any = {
    firstName: "",
    address: "",
    pinCode: "",
    phoneNumber: "",
    city: "",
    country: "",

  }
  gstModel: any = {
    gst_request: false,
    legal_name: '',
    gst_number: '',

  }
  submitted: any = false;
  userDetail: any;
  pinCode: any;
  deliveryCharge: any;
  mainTotal: any;
  isAlertOpen2 = false;
  payPalConfig: any = {}
  showPayment: any = false;
  client_id =
    'ASH5hC7LkddRNU9_YxZVCYBAPWsnLjOtNSwj2Ig1yUcbHpjU3G386YFyK9acZv7tgFeznpyZeiHkxD8q';
  allContryCode: any = [];
  selectedContry: any = {};
  config: any = {
    // displayFn: (item: any) => { return item.hello.world; }, //to support flexible text displaying for each item
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: '200px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select Country', // text to be displayed when no item is selected defaults to Select,
    customComparator: () => { },// a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false,// clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
    // selectAllLabel: 'Select all', // label that is displayed in multiple selection for select all
    enableSelectAll: false, // enable select all option to select all available items, default is false
  }
  charge: any;
  couponCode: any = "";
  payment_type: any = "Online";
  couponCodeList: any = {};
  productId: any = [];
  cartId: any;
  categoryId: any = [];
  categorysId: any;
  minimumShopping: any;
  couponDiscount: any = 0;
  couponMessage: any = '';
  shippingAddressData: any = {};
  deliveryTime: any = '00:00 Hrs'
  newInterval: any;
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private ref: ChangeDetectorRef,
    private alertController: AlertController,
    private events: EventService,
    private animationCtrl: AnimationController
  ) {
    this.allContryCode = contryCode;
    this.events.subscribe('addToCart', (data: any) => {
      const addCartDetail = localStorage.getItem('addCartDetail')
      if (addCartDetail) {
        this.cartData = JSON.parse(addCartDetail)
        this.chackQty()
        this.events.publish('updateComp', '')
      }
    });

    console.log(this.cartData)
  }

  ngOnInit() { }

  ionViewWillLeave() {
    clearInterval(this.newInterval)
  }

  ionViewWillEnter() {
    const addCartDetail = localStorage.getItem('addCartDetail')
    if (addCartDetail) {
      this.cartData = JSON.parse(addCartDetail)
      this.newInterval = setInterval(() => {
        this.popoutBox.forEach((box: any, index: any) => {
          // const animation = this.animationCtrl.create()
          //   .addElement(box.nativeElement)
          //   .duration(300)
          //   .easing('ease-out')
          //   .delay(index * 150) // stagger effect
          //   .fromTo('transform', 'scale(0)', 'scale(1)')
          //   .fromTo('opacity', '0', '1');

          // animation.play();
          this.popOutAnimation(box.nativeElement, index);
        });

      }, 1000);
    }

    const userDetail = localStorage.getItem('userDetail')
    if (userDetail) {
      this.userDetail = JSON.parse(userDetail)
    }

    this.chackQty()
    this.ref.detectChanges()
    this.getProduct();
    this.allContryCode = contryCode;

    this.getProfile()
  }

  popOutAnimation(element: HTMLElement, index?: any) {
    const animation = this.animationCtrl.create()
      .addElement(element)
      .duration(1000)
      .easing('ease-out')
      .fromTo('transform', 'scale(0)', 'scale(1)')
      .fromTo('opacity', '0', '1');

    animation.play();
  }

  couponPage() {
    this.navCtrl.navigateForward(['/coupon'])
  }

  couponApply() {
    if (this.couponCode === '') {
      this.common.presentToaster('Coupon code is required')
      return
    }
    const data: any = {
      coupon_code: this.couponCode.split('HLO')[1],
    }
    console.log(data)
    // return
    this.common.showLoading();
    this.service.couponByCouponCode(data).subscribe(
      (res: any) => {
        console.log(res)
        this.common.hideLoading();
        if (res?.data) {
          this.couponCodeList = res?.data;

          if (this.couponCodeList?.coupon_type === 'For Products') {
            this.productId = this.couponCodeList?.product_name.map((f: any) => f._id)
            console.log(this.productId)
            this.cartId = this.cartData.find((f: any) => this.productId.includes(f._id))
            console.log(this.cartId)
            if (this.cartId) {
              this.couponMessage = '';
              if (this.couponCodeList.discount_type === 'Normal') {
                this.couponDiscount = this.couponCodeList.Discount
              } else {
                this.couponDiscount = Math.round((this.cartId.total / 100) * (this.couponCodeList.Discount))
              }
            } else {
              this.couponMessage = 'This coupon product is not available in the cart'
              this.common.presentToaster('This coupon product is not available in the cart')
            }

            this.mainTotal = this.mainTotal - this.couponDiscount

            console.log(this.couponDiscount)
            console.log(this.mainTotal)
          }

          if (this.couponCodeList?.coupon_type === 'For Categories') {
            this.categoryId = this.couponCodeList?.category.map((f: any) => f._id)
            console.log(this.categoryId)
            this.categorysId = this.cartData.find((f: any) => this.categoryId.includes(f?.category?._id))
            console.log(this.categorysId)

            if (this.categorysId) {
              this.couponMessage = '';
              if (this.couponCodeList.discount_type === 'Normal') {
                this.couponDiscount = this.couponCodeList.Discount
              } else {
                this.couponDiscount = Math.round((this.categorysId.total / 100) * (this.couponCodeList.Discount))
              }
            } else {
              this.couponMessage = 'This coupon category is not available in the cart'
              this.common.presentToaster('This coupon category is not available in the cart')
            }

            this.mainTotal = this.mainTotal - this.couponDiscount
          }

          if (this.couponCodeList?.coupon_type === 'For Total Orders') {
            this.minimumShopping = this.couponCodeList?.minimum_shopping;

            if (this.minimumShopping < this.mainTotal) {
              this.couponMessage = '';
              if (this.couponCodeList.discount_type === 'Normal') {
                this.couponDiscount = this.couponCodeList.Discount
              } else {
                let d = Math.round((this.mainTotal / 100) * (this.couponCodeList.Discount))
                if (d > this.couponCodeList.maximum_discount_amount) {
                  this.couponDiscount = this.couponCodeList.maximum_discount_amount
                } else {
                  this.couponDiscount = d
                }
              }
            } else {
              this.couponMessage = `The cart amount should be minimum ${this.minimumShopping} rs`
              this.common.presentToaster(`The cart amount should be minimum ${this.minimumShopping} rs`)
            }

            this.mainTotal = this.mainTotal - this.couponDiscount;

            console.log(this.minimumShopping)
            console.log(this.mainTotal)
          }

          if (this.couponCodeList?.coupon_type === 'Single Use Coupon') {
            if (this.couponCodeList.user.includes(this.userDetail?._id)) {
              this.couponMessage = `You can use only one time this coupon code`
              this.common.presentToaster(`You can use only one time this coupon code`)
              return
            }
            this.minimumShopping = this.couponCodeList?.minimum_shopping;

            if (this.minimumShopping < this.mainTotal) {
              this.couponMessage = '';
              if (this.couponCodeList.discount_type === 'Normal') {
                this.couponDiscount = this.couponCodeList.Discount
              } else {
                let d = Math.round((this.mainTotal / 100) * (this.couponCodeList.Discount))
                if (d > this.couponCodeList.maximum_discount_amount) {
                  this.couponDiscount = this.couponCodeList.maximum_discount_amount
                } else {
                  this.couponDiscount = d
                }
              }
            } else {
              this.couponMessage = `The cart amount should be minimum ${this.minimumShopping} rs`
              this.common.presentToaster(`The cart amount should be minimum ${this.minimumShopping} rs`)
            }

            this.mainTotal = this.mainTotal - this.couponDiscount;

            console.log(this.minimumShopping)
            console.log(this.mainTotal)
          }

        } else {
          this.couponMessage = `Invalid coupon code`
        }

        // this.navCtrl.navigateForward(['/coupon'])
        // this.common.presentToaster(res?.data?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.data?.message);
      }
    );
  }

  async payWithRazorpay(order_id: any) {
    const options: any = {
      key: 'rzp_test_N00ngDeR3qA8rN',
      amount: Number(this.mainTotal) * 100,
      description: 'Great offers',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      order_id,//Order ID generated in Step 1
      currency: 'INR',
      name: 'Hardwarelo',
      prefill: {
        email: this.userDetail?.email || '',
        contact: this.userDetail?.shiping_address?.phoneNumber || this.shippingAddressModel?.phoneNumber
      },
      theme: {
        color: '#001F8D'
      }
    }
    try {
      let data = await Checkout.open(options);
      console.log(data.response + "AcmeCorp");
      console.log(JSON.stringify(data))
      this.createOrder()
    } catch (error: any) {
      //it's paramount that you parse the data into a JSONObject
      let errorObj = JSON.parse(error['code'])
      alert('Payment failed')
      // alert(errorObj.description);
      // alert(errorObj.code);

      // alert(errorObj.reason);
      // alert(errorObj.step);
      // alert(errorObj.source);
      // alert(errorObj.metadata.order_id);
      // alert(errorObj.metadata.p
      // ayment_id);

    }
  }

  async presentAlert(response: any) {
    // let responseObj = JSON.parse(response)
    console.log("message" + response['razorpay_payment_id']);
    const alert = await this.alertController.create({
      message: response['razorpay_payment_id'],
      backdropDismiss: true,
    });

    await alert.present();
  }

  shippingAddressForms() {
    this.isAlertOpen = false;
    this.showPayment = false
  }

  selectionChanged(e: any) {
    this.selectedContry = e.value
    this.shippingAddressModel.contry = e.value
  }

  productdeliveryTime(minutes: any) {
    return this.common.convetMinutstoHours(Number(minutes))
  }

  chackQty() {
    this.cartTotal = this.cartData?.reduce(
      (accumulator: any, currentValue: any) => accumulator + Number(currentValue?.total || 0),
      0,
    );
    this.cartTotal = Math.round(this.cartTotal)

    this.cartItem = this.cartData?.reduce(
      (accumulator: any, currentValue: any) => accumulator + Number(currentValue?.qty || 0),
      0,
    );
    this.cartItem = Math.round(this.cartItem)

    const d = this.cartData.map((f: any) => f.charge?.charge)
    this.cartCharge = Math.max(...d)

    this.pinCode = localStorage.getItem('pinCode')


    this.mainTotal = this.cartCharge + this.cartTotal;
  }

  placeOrder() {
    // if (gstform?.form?.invalid) {
    //   this.submitted = true;
    //   return;
    // }
    if (this.userDetail) {
      if (this.userDetail?.shiping_address?.address) {
        if (this.payment_type === 'COD') {
          this.createOrder()
        } else {
          this.createOrderId()
        }
      } else {
        this.getProfile()
        this.isAlertOpen = true
      }


    } else {
      this.common.presentToaster('Login detalis required')
      this.navCtrl.navigateForward(['/sign-in'])
    }
  }

  getProfile() {
    this.common.showLoading();
    this.service.getProfile().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.shippingAddressData = res?.data?.shiping_address;

        this.shippingAddressModel = {
          firstName: res?.data?.shiping_address?.firstName,
          address: res?.data?.shiping_address?.address,
          pinCode: res?.data?.shiping_address?.pinCode,
          phoneNumber: res?.data?.shiping_address?.phoneNumber,
          city: res?.data?.shiping_address?.city,
          country: res?.data?.shiping_address?.country,
        }
        this.selectedContry = res?.data?.shiping_address?.country?.name;
        this.userDetail = res.data
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  checkOutPage() {
    this.navCtrl.navigateForward(['/check-out'], {
      queryParams: { cart: JSON.stringify(this.cartData), cartTotal: this.cartTotal, cartItem: this.cartItem },
    });
  }

  deleteItem(i: any) {
    this.couponMessage = '';
    this.couponCode = '';
    if (i !== -1) {
      this.cartData.splice(i, 1);
    }
    this.chackQty()
    localStorage.setItem('addCartDetail', JSON.stringify(this.cartData))
    this.events.publish('updateComp', '')
  }

  removeItem(item: any) {
    if (item.qty > item?.charge?.quantity) {
      item.qty = item.qty - 1
      item.total = item.qty * item.discount
    }
    this.chackQty()
    localStorage.setItem('addCartDetail', JSON.stringify(this.cartData))
    this.events.publish('updateComp', '')
  }

  addItem(item: any) {
    item.qty = item.qty + 1
    item.total = item.qty * item.discount
    this.chackQty()
    localStorage.setItem('addCartDetail', JSON.stringify(this.cartData))
    this.events.publish('updateComp', '')
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

  emptyCart() {
    this.couponMessage = '';
    this.couponCode = '';
    this.cartData = [];
    localStorage.removeItem('addCartDetail');
    this.isAlertOpen2 = false;
    this.events.publish('updateComp', '');
  }

  emptyCartPopup() {
    if (this.cartData?.length) {
      this.isAlertOpen2 = true
    } else if (this.cartData?.length === 0) {
      this.common.presentToaster('Cart required')
      return
    }
  }

  checkQuqntityFromServer(gstform: any) {
    if (gstform?.form?.invalid) {
      this.submitted = true;
      return;
    }
    let datas: any = []
    this.cartData.forEach((element: any) => {
      datas.push({
        product: element?._id,
        image: element.varients[0]?.image[0],
        total: element.total,
        price: element.price,
        qty: element.qty,
        seller_id: element.userid,
        color: element.color,
        size: element.size,
      })
    });


    this.service.checkqty(datas).subscribe(
      async (res: any) => {
        this.common.hideLoading();
        console.log(res.data)
        // this.common.presentToaster(res?.data?.message)
        if (res.data.err) {
          const alert = await this.alertController.create({
            message: res?.data?.message,
            buttons: [
              {
                text: 'OK',
                htmlAttributes: {
                  'aria-label': 'close',
                },
              },
            ],
            mode: 'ios'
          })
          await alert.present()
        } else {
          this.placeOrder()
        }

      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  createOrder() {
    let datas: any = []
    this.cartData.forEach((element: any) => {
      datas.push({
        product: element?._id,
        image: element.varients[0]?.image[0],
        total: element.total,
        price: element.price,
        qty: element.qty,
        seller_id: element.userid,
        color: element.color,
        size: element.size,
      })
    });
    let data: any = {
      productDetail: datas,
      shiping_address: this.shippingAddressModel,
      total: this.cartTotal,
      delivery_fee: this.cartCharge,
      payment_type: this.payment_type,
      main_total: this.mainTotal,
    }

    if (this.couponDiscount) {
      data.coupon_code = this.couponCode;
      data.coupon_discount = this.couponDiscount
      data.coupon = this.couponCodeList?._id
      data.coupon_type = this.couponCodeList?.coupon_type
    }

    if (this.gstModel.gst_request) {
      data = { ...data, ...this.gstModel }
    }


    this.common.showLoading();
    this.service.createProductRquest(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.isAlertOpen = false;
        this.cartData = [];
        this.couponCode = "";
        this.couponDiscount = ""
        this.couponCodeList = {}
        this.gstModel = {
          gst_request: false,
          legal_name: '',
          gst_number: '',
        }
        localStorage.removeItem('addCartDetail')
        setTimeout(() => {
          this.events.publish('updateComp', '')
          this.navCtrl.navigateForward(['/orders'])
        }, 500);

        // this.common.presentToaster(res?.data?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  gotoHome() {
    this.navCtrl.navigateForward(['/tabs/home'])
  }
  createOrderId() {
    this.common.showLoading();
    const data = {
      amount: Number(this.mainTotal) * 100,
      currency: 'INR',
    }
    this.service.getorderId(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.status) {
          this.payWithRazorpay(res.data.id)
        }
        // this.common.presentToaster(res?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  updateProfile() {
    // profileForm: any
    // if (profileForm.form.invalid) {
    //   this.submitted = true
    //   return
    // }
    const data = {
      shiping_address: this.shippingAddressModel,
    }
    this.common.showLoading();
    this.service.updateProfile(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.getProfile()
        // this.common.presentToaster(res?.data?.message)
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  createProductRquest(shippingAddressForm: any) {
    if (shippingAddressForm.form.invalid) {
      this.submitted = true
      return
    }
    this.isAlertOpen = false;
    this.updateProfile()
    // if (this.payment_type === 'COD') {
    //   this.createOrder()
    // } else {
    //   this.createOrderId()
    // }

    // this.createOrder()

    // this.payWithRazorpay()
    // this.showPayment = true
  }

  shippingAddressPage() {
    this.navCtrl.navigateForward(['/shipping-address'])
  }
}
