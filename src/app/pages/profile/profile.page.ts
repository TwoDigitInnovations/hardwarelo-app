import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileModel: any = {
    fullName: "",
    phoneNumber: "",
    pinCode: "",
    email: "",
  }
  submitted: any = false;
  imageData: any = {
    image: ''
  }
  isEdit: any = false
  imagesSource: any;
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  takePicture = async () => {
    const image: any = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });

    const response = await fetch(image.webPath);
    const blob = await response.blob();
    // Convert the captured image to Base64
    const name = `${new Date().getTime()}.png`;
    const data = new FormData();
    data.append('file', blob, name);
    // this.common.showLoading();
    this.service.fileupload(data).subscribe(
      (res: any) => {
        // this.common.hideLoading();
        if (res.status) {
          this.imagesSource = res.data.file;
          this.common.presentToaster(res?.data?.message);
        }
      },
      (err) => {
        // this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
    const reader: any = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      // this.imagesSource = 'data:image/jpeg;base64,' + base64Data;
      // Now, you have the base64Data.
    };
    reader.readAsDataURL(blob);
  };

  ionViewWillEnter() {
    this.getProfile()
  }

  getProfile() {
    this.common.showLoading();
    this.service.getProfile().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.profileModel = {
          fullName: res.data.username,
          phoneNumber: res.data.number,
          pinCode: res.data.pincode,
          email: res.data.email,
        }
        // this.imageData.image = res.data.profile
        this.imagesSource = res.data?.profile;
        localStorage.setItem('userDetail', JSON.stringify(res?.data))
      },
      (err) => {
        this.common.hideLoading();
        console.log(err);
        this.common.presentToaster(err?.error?.message);
      }
    );
  }

  updateProfile(profileForm: any) {
    if (profileForm.form.invalid) {
      this.submitted = true
      return
    }
    const data = {
      username: this.profileModel.fullName,
      number: this.profileModel.phoneNumber,
      pincode: this.profileModel.pinCode,
      email: this.profileModel.email,
      // profile: this.imageData.image,
      profile: this.imagesSource,
    }
    this.common.showLoading();
    this.service.updateProfile(data).subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.getProfile()
        this.submitted = false
        this.isEdit = false
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

  logOut() {
    localStorage.clear()
    this.navCtrl.navigateRoot(['/sign-in'])
  }

  orders() {
    this.navCtrl.navigateForward(['/orders'])
  }
}
