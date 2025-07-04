import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  standalone: false,
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  ordersData: any = []
  constructor(
    private navCtrl: NavController,
    private common: CommonService,
    private service: ServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProductRequestbyUser();
  }

  getProductRequestbyUser() {
    this.common.showLoading();
    this.service.getProductRequestbyUser().subscribe(
      (res: any) => {
        this.common.hideLoading();
        this.ordersData = res.data;
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

  ordersDetails(id: any, product_id: any) {
    this.navCtrl.navigateForward(['/orders-details'], {
      queryParams: { ord_id: id, product_id },
    });
  }
}
