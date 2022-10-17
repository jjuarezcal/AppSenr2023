import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpModule } from '@angular/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

import { ReactiveFormsModule } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


// Servicios
import { CategoriesService,
         SpeakersService,
         InformacionService,
         NewsService,
         UbicacionService,
         ProgramaService,
         TasksServiceService,
         PushnotificationService,
         MicongresoService,
         RoomsService,
         PostersService,
         OralesService,
         SponsorsService,
         OrganizadoresService,
         AuthService,
         PreguntasService} from '../app/providers/index.services';

import { CallNumber } from '@ionic-native/call-number/ngx';

// pipes

// plugins
import { SQLite} from '@ionic-native/sqlite/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';

import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

/*paginas modales*/
 import { PreguntamodalPageModule } from './preguntamodal/preguntamodal.module';
 import { RespondermodalPageModule } from './respondermodal/respondermodal.module';
 import { PantallaPageModule } from './pantalla/pantalla.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app
    AngularFirestoreModule, // imports firebase/firestore
    AngularFireAuthModule, // imports firebase/auth
    AngularFireStorageModule, // imports firebase/storage
    PreguntamodalPageModule,
    RespondermodalPageModule,
    PantallaPageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriesService,
    SpeakersService,
    InformacionService,
    NewsService,
    UbicacionService,
    ProgramaService,
    TasksServiceService,
    SQLite,
    OneSignal,
    PushnotificationService,
    MicongresoService,
    CallNumber,
    SocialSharing,
    RoomsService,
    PostersService,
    File,
    DocumentViewer,
    FileTransfer,
    FileOpener,
    InAppBrowser,
    OralesService,
    SponsorsService,
    OrganizadoresService,
    NativePageTransitions,
    AuthService,
    PreguntasService,
    ImagePicker,
    WebView,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
