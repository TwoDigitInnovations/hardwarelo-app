import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  forgotPasswordModel: any = {
    email: '',
    // ConfirmPassword: '',
  }
  submitted: any = false;
  verified: any = false;
  token: any
  otp: any
  password: any
  confirmPassword: any
  step: any = 1
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() { }

  loginData(forgotPasswordForm: any) {
    // this.navCtrl.navigateForward(['/sign-in']);
    // return
    if (forgotPasswordForm?.form?.invalid) {
      this.submitted = true;
      return;
    }

    // if (this.forgotPasswordModel?.phone.toString().length !== 10) {
    //   this.common.presentToaster('Invalid your phone number');
    //   return;
    // }
    if (this.step === 1) {
      this.sendOTP()
    } if (this.step === 2) {
      this.verifyOtp()
    } if (this.step === 3) {
      this.changePassword()
    }
  }

  verifyOtp() {
    const data = {
      otp: this.otp,
      token: this.token
    }
    this.common.showLoading();
    this.service.verifyOtp(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.submitted = false
        this.common.presentToaster(res?.data?.message)
        this.step = 3;
        this.token = res?.data?.token
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  changePassword() {
    if (this.password !== this.confirmPassword) {
      this.common.presentToaster("Comfirm password don't match with password");
      return;
    }
    const data = {
      password: this.password,
      token: this.token
    }
    this.common.showLoading();
    this.service.changePassword(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.submitted = false
        this.common.presentToaster(res?.data?.message);
        this.password = '';
        this.confirmPassword = '';
        this.step = 1
        this.navCtrl.navigateForward(['/sign-in']);
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  sendOTP() {
    console.log(this.forgotPasswordModel)
    const data = {
      phone: this.forgotPasswordModel.email,
      // ConfirmPassword: this.forgotPasswordModel.ConfirmPassword,
    }
    this.common.showLoading();
    this.service.sendOTPForForgetPassword(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.submitted = false
        this.common.presentToaster(res?.data?.message)
        this.step = 2;
        this.token = res?.data?.token
        // localStorage.setItem('token', res.data.token)
        // this.navCtrl.navigateRoot(['/tabs/home'])
        this.forgotPasswordModel = {
          email: '',
        }
        this.submitted = false;
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
