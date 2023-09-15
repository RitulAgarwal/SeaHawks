import { TabsPage } from "./tabs/tabs.page";
import { Component } from "@angular/core";

import { AlertController, MenuController, Platform, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import * as AppGeneral from "socialcalc/AppGeneral";
import { InappPurchaseService } from "./inapp-purchase.service";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { CloudServiceService } from "./cloud-service.service";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { DATA, APP_NAME, LINK, LOGO } from "./app-data";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
const IMG_LINK = "www/assets/img/icon.png";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  // rootPage: any = TabsPage;

  msc: any;
  request: any = {};
  radioOpen: any;
  radioResult: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mctrl:MenuController,
    public inapp: InappPurchaseService,
    public emailComposer: EmailComposer,
    public cloudService: CloudServiceService,
    public alertCtrl: AlertController,
    public socialSharing: SocialSharing,
    private toastCtrl:ToastController,
    public iab: InAppBrowser,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu(){
    this.mctrl.close();
  }

  write() {
    let email = {
      to: "",
      cc: "",
      subject: APP_NAME + ": Please share your feedback",
      body: "",
      isHtml: true,
    };

    this.emailComposer.open(email).then(() => {
      console.log("Email sent!");
    });
  }

  refer() {
    let alert = this.alertCtrl
      .create({
        header: "Refer to a friend",
        inputs: [
          {
            type: "radio",
            label: "Facebook",
            value: "facebook",
            checked: false,
          },
          {
            type: "radio",
            label: "Twitter",
            value: "twitter",
            checked: false,
          },
          {
            type: "radio",
            label: "Email",
            value: "email",
            checked: false,
          },
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            // handler
          },
          {
            text: "Share",
            handler: (shareVia) => {
              this.radioOpen = false;
              this.radioResult = shareVia;
              let content = LINK;
              if (shareVia == "twitter") {
                this.socialSharing
                  .shareViaTwitter(
                    APP_NAME + " on the App Store",
                    "www/assets/img/icon.png",
                    content
                  )
                  .then(() => {
                    console.log("Twitter done");
                  })
                  .catch(() => {
                    // this.showToast('Cannot share via Twitter!');
                  });
              } else if (shareVia == "facebook") {
                this.socialSharing
                  .shareViaFacebook(
                    APP_NAME + " on the App Store",
                    "www/assets/img/icon.png",
                    content
                  )
                  .then(() => {
                    console.log("share via facebook done");
                  })
                  .catch(() => {
                    // this.showToast('Cannot share via Facebook!');
                  });
              } else {
                this.socialSharing
                  .canShareViaEmail()
                  .then(() => {
                    this.socialSharing
                      .shareViaEmail(
                        content,
                        APP_NAME + " on the App Store",
                        null,
                        null,
                        null,
                        null
                      )
                      .then(() => {})
                      .catch(() => {});
                  })
                  .catch(() => {
                    console.log("email failed");
                  });
              }
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
    // alert.setTitle("Refer to a friend");

    // alert.addInput({
    //   type: "radio",
    //   label: "Facebook",
    //   value: "facebook",
    //   checked: false,
    // });
    // alert.addInput({
    //   type: "radio",
    //   label: "Twitter",
    //   value: "twitter",
    //   checked: false,
    // });
    // alert.addInput({
    //   type: "radio",
    //   label: "Email",
    //   value: "email",
    //   checked: false,
    // });

    // alert.addButton("Cancel");
    // alert.addButton({
    //   text: "OK",
    //   handler: (shareVia) => {
    //     this.radioOpen = false;
    //     this.radioResult = shareVia;
    //     let content = LINK;
    //     if (shareVia == "twitter") {
    //       this.socialSharing
    //         .shareViaTwitter(
    //           APP_NAME + " on the App Store",
    //           "www/assets/img/icon.png",
    //           content
    //         )
    //         .then(() => {
    //           console.log("Twitter done");
    //         })
    //         .catch(() => {
    //           // this.showToast('Cannot share via Twitter!');
    //         });
    //     } else if (shareVia == "facebook") {
    //       this.socialSharing
    //         .shareViaFacebook(
    //           APP_NAME + " on the App Store",
    //           "www/assets/img/icon.png",
    //           content
    //         )
    //         .then(() => {
    //           console.log("share via facebook done");
    //         })
    //         .catch(() => {
    //           // this.showToast('Cannot share via Facebook!');
    //         });
    //     } else {
    //       this.socialSharing
    //         .canShareViaEmail()
    //         .then(() => {
    //           this.socialSharing
    //             .shareViaEmail(
    //               content,
    //               APP_NAME + " on the App Store",
    //               null,
    //               null,
    //               null,
    //               null
    //             )
    //             .then(() => {})
    //             .catch(() => {});
    //         })
    //         .catch(() => {
    //           console.log("email failed");
    //         });
    //     }
    //   },
    // });
    // alert.present();
  }

  visit() {
    // window.open('http://aspiringapps.com','_blank');
    let browser = this.iab.create("https://aspiringapps.com");
    setTimeout(() => {
      browser.close();
    }, 3000);
  }

}
