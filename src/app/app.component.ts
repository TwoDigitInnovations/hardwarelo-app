import { Component, Optional } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouteTrackerService } from './routerTrack.service';
import { SafeArea } from 'capacitor-plugin-safe-area';

register();

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router,
    private routeTracker: RouteTrackerService,
    @Optional() private routerOutlet: IonRouterOutlet,

  ) {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      console.log('statusbarHeight', insets);
      document.documentElement.style.setProperty(
        `--bottom-area`,
        `${insets.bottom + 80}px`,
      );
    });

    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {

      console.log(statusBarHeight, 'statusbarHeight');
      document.documentElement.style.setProperty(
        `--safe-area-inset-top`,
        `${statusBarHeight}px`,
      );
    });
    console.log(this.router.url)
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Handler was called!');
      const prevUrl = this.routeTracker.getPreviousUrl();
      // alert(prevUrl)
      if (prevUrl !== '/sign-in') {
        console.log(this.router.url);
        this.navCtrl.back();
      }
      processNextHandler();
    });

  }

  chat() {
    window.open(
      `https://api.whatsapp.com/send/?phone=+918638597393&text=Hi,&app_absent=0`
    );
  }
}
