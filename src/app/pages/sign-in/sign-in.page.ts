import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signinModel: any = {
    email: '',
    password: '',
  }
  submitted: any = false;
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,

  ) {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   this.navCtrl.navigateRoot(['/tabs/home'])
    // }
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.signinModel = {
      email: '',
      password: '',
    }
  }

  forgetPasswordPage() {
    this.navCtrl.navigateForward(['/forgot-password'])
  }

  signUpPage() {
    this.navCtrl.navigateForward(['/sign-up'])
  }

  login(signinForm: any) {
    // this.navCtrl.navigateForward(['/tabs/home'])
    // return
    if (signinForm.form.invalid) {
      this.submitted = true
      return
    }
    const data = {
      username: this.signinModel.email,
      password: this.signinModel.password,
    }
    this.common.showLoading();
    this.service.login(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.submitted = false
        this.common.presentToaster(res?.data?.email)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userDetail', JSON.stringify(res.data))
        localStorage.setItem('pinCode', res.data.pincode)
        this.navCtrl.navigateRoot(['/tabs/home'])

        // localStorage.setItem('role', res.data.role)
        // localStorage.setItem('userData', JSON.stringify(res.data))
        // if (res.data.is_pass_reset === 0) {
        //   this.navCtrl.navigateRoot(['/tabs/profile'])
        // } else {
        //   this.navCtrl.navigateRoot(['/tabs/dashboard'])
        // }
        this.signinModel = {
          email: '',
          password: '',
        }
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  homePage() {
    this.navCtrl.navigateForward(['/tabs/home'])
  }

  privacyPoliciesPage() {
    this.navCtrl.navigateForward(['/privacy-policies'])
  }

  termsAndConditionsPage() {
    this.navCtrl.navigateForward(['/terms-and-conditions'])
  }

  goBack() {
    this.navCtrl.back();
  }
}
