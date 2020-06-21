import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  isExitAlertOpen = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();

      this.initializeApp();
    });
  }


  initializeApp() {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
            outlet.pop();

        } else {
          if (this.isExitAlertOpen) { return; }
          this.isExitAlertOpen = true;
          this.showExitAlert();
          // navigator['app'].exitApp();
        }
      });
    });
  }

  async showExitAlert() {
    (await this.alertCtrl.create({
      message: 'Are you sure you want to exit the app?',
      // enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.isExitAlertOpen = false;
            navigator['app'].exitApp();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.isExitAlertOpen = false;
          }
        }
      ]
    })).present();
}
}
