import { Component, OnInit } from '@angular/core';
import { IonicSlides, NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.page.html',
  styleUrls: ['./carousel-card.page.scss'],
})
export class CarouselCardPage implements OnInit {
  swiperModules = [IonicSlides];
  options: any = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletClass: 'swiper-pagination-bullet swiper-pagination-testClass',
    },
  };
  settingData: any = [];

  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
  ) { }

  ngOnInit() {
    this.getsetting()
  }

  getsetting() {
    this.common.showLoading();
    this.service.getsetting().subscribe(
      (res: any) => {
        this.common.hideLoading();
        console.log(res);
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
}
