import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  userImg: any = '';
  base64Img = ''



  clickedImage!: string;
  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }


  gelleryOptions: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: true
    }



  constructor(private camera: Camera,private platform: Platform, private file :File) {
 
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
     // Here you can do any higher level native things you might need.
    //  statusBar.styleDefault();
    //  splashScreen.hide();
    })
     this.userImg = 'assets/imgs/logo.png';

   }
  // captureImage() {
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.clickedImage = base64Image;
  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });
  // }




  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
  
      // Generate a dynamic file name (e.g., a timestamp)
      const fileName = new Date().getTime() + '.jpg';
  
      // Save the image with the generated file name
      this.file.writeFile(this.file.dataDirectory, fileName, base64Image, { replace: true })
        .then(() => {
          console.log('Image saved to device:', fileName);
        })
        .catch((error) => {
          console.error('Error saving image to device:', error);
        });
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
  
  


  openGallery() {
    this.camera.getPicture(this.gelleryOptions).then((imgData) => {
     console.log('image data =>  ', imgData);
     this.base64Img = 'data:image/jpeg;base64,' + imgData;
     this.userImg = this.base64Img;
     }, (err) => {
     console.log(err);
     })
    }



}