import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushnotificationService {

  constructor(public oneSignal: OneSignal,
              public platform: Platform) { }


  init_notifications() {

    if ( this.platform.is('cordova')) {
      this.oneSignal.startInit('20ca8a8b-4df2-47d2-ba43-cd4d1a6d7f4b', '868000045343');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
       // do something when notification is received
       console.log('Notificación recibida');
      });
        this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        console.log('Notificación abierta');
      });

      this.oneSignal.endInit();


    } else {
      console.log('No estás en el dispositivo');
    }


  }
}
