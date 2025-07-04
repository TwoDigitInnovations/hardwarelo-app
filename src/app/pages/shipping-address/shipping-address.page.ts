import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {
  shippingAddressModel: any = {
    firstName: "",
    address: "",
    pinCode: "",
    phoneNumber: "",
    city: "",
    country: "",
  }
  submitted: any = false;
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  createProductRquest(shippingAddressForm: any) {
    if (shippingAddressForm.form.invalid) {
      this.submitted = true
      return
    }

    const data = {

    }

    this.common.showLoading();
    this.service.createProductRquest(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.navCtrl.navigateForward(['/check-out'])
        // this.common.presentToaster(res?.data?.message)
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
}
