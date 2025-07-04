import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpModel: any = {
    fullName: '',
    phoneNumber: '',
    pinCode: '',
    email: '',
    password: '',
    otp: '',
  }
  submitted: any = false;
  otpShow: any = false;
  token: any
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  signInPage() {
    this.navCtrl.navigateForward(['/sign-in'])
  }

  validationForm(signUpForm: any) {
    // this.navCtrl.navigateForward(['/sign-in'])
    // return
    if (signUpForm.form.invalid) {
      this.submitted = true
      return
    }
    // this.signUp()
    if (this.otpShow) {
      // this.sendOTPForSignUp()
      this.signUp()
    } else {
      this.sendOTPForSignUp()
    }
  }

  signUp() {
    const data = {
      username: this.signUpModel.fullName,
      number: this.signUpModel.phoneNumber,
      pincode: this.signUpModel.pinCode,
      email: this.signUpModel.email,
      password: this.signUpModel.password,
      otp: this.signUpModel.otp,
      token: this.token,
      type: 'USER'
    }
    this.common.showLoading();
    this.service.signUp(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.success) {
          this.submitted = false
          this.common.presentToaster('Congratulations! Your sign-up process was successful.')
          this.navCtrl.navigateRoot(['/sign-in'])
          this.signUpModel = {
            fullName: '',
            phoneNumber: '',
            pinCode: '',
            email: '',
            password: '',
          }
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  sendOTPForSignUp() {
    const data = {
      phone: this.signUpModel.phoneNumber,
      email: this.signUpModel.email,
      type: 'signup',
    }
    this.common.showLoading();
    this.service.sendOTPForSignUp(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        if (res.success) {
          this.otpShow = true
          this.submitted = false
          this.common.presentToaster(res?.message)
          this.token = res.data.token
        }
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
