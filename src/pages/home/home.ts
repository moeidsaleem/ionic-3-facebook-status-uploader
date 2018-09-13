import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private alertCtrl:AlertController,private spinner:LoadingController,
    private camera: Camera,private fb: Facebook) {

  }


  base64Image
  sourcex;



  spinx(){
    return this.spinner.create({
      showBackdrop: true,
      duration:3000
    }).present();
  }

  EnterCaption(){
    this.alertCtrl.create({
      message:'Enter status',
       
    })
  }

 


  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'caption',
          placeholder: 'Caption'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Upload to Fb',
          handler: data => {


          
          }
        }
      ]
    });
    alert.present();
  }




  takePhoto(source){
    if(source == 'camera'){
      this.sourcex =this.camera.PictureSourceType.CAMERA;
      
    }else if(source == 'library'){
      this.sourcex =this.camera.PictureSourceType.PHOTOLIBRARY;

    }
    
const options: CameraOptions = {
  quality: 100,
  sourceType:this.sourcex,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  allowEdit:true
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 this.base64Image = 'data:image/jpeg;base64,' + imageData;
 this.presentPrompt();
}, (err) => {
 // Handle error
 console.log(err);
});
  }

}
