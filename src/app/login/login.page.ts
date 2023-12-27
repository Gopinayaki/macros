import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { NavController } from '@ionic/angular';
import { uid } from 'uid';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm!: FormGroup;
  username: string = '';
  password: string = '';
  errorMessage: string | null = null; 
  loading: any;
  remberMe: any;


  constructor(private navCtrl: NavController, public toastController: ToastController,public loadingController: LoadingController,public modalController: ModalController,private route: Router,private fb: FormBuilder,private loginService: LoginService    ) {}

  ngOnInit() { this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    // imei: ['', Validators.required]
  })}

  // login() {
  //   // Perform authentication logic here
  //   if (this.username === 'gopi' && this.password === 'gopi') {
  //     this.navCtrl.navigateRoot('/tabs');
  //   } 
    
    
  //   else {
  //     this.errorMessage = 'Invalid username or password';
  //     console.log('Invalid username or password');
  //   }
  // }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      console.log("login value", this.loginForm.value)
      let postData = this.loginForm.value
      await this.presentLoading()
      this.afterLoginAuth(postData)
    }
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait... Trying to reach Server',
      // duration: 2000
    });
    await this.loading.present();
  }

  afterLoginAuth(data: any) {
    var grant_type = data['grant_type'] = 'password';

    var key = CryptoJS.enc.Utf8.parse("PyNmDKjdFXchIFhxEv0VOf2b968ZbVSb");
    console.log(key);
    var specialString = "~!@#";
    var uniqueId = uid(8);
    // var uniqueId = uuidv4();
    console.log("uniqueId",uniqueId);
    
    var user = data['username'] ;
    var password = data['password'] + specialString + uniqueId;
    var checkpassword = data['password'];

    var i_v = CryptoJS.enc.Utf8.parse('I8zyA4lVhMCaJ5Kg');
    console.log("iv",i_v);

    var encryptUser = CryptoJS.AES.encrypt(user, key,
    {  mode: CryptoJS.mode.CBC ,iv:i_v , keySize:256/8 }).toString();
    encryptUser = encodeURIComponent(encryptUser);
    console.log('encryptUser',encryptUser);

    var encryptPassword = CryptoJS.AES.encrypt(password, key,
      {  mode: CryptoJS.mode.CBC ,iv:i_v , keySize:256/8 }).toString();

      // encryptPassword = encryptPassword.replace(/\s/g, '');
      var encodedEncryptPassword = encodeURIComponent(encryptPassword);
      console.log('encodedEncryptPassword', encodedEncryptPassword);      
      console.log('encryptPassword',encryptPassword);

    var encryptCheckPassword = CryptoJS.AES.encrypt(checkpassword, key,
      {  mode: CryptoJS.mode.CBC ,iv:i_v , keySize:256/8 }).toString();
  
    this.loginService.tokenLogin(grant_type,encryptUser,encodedEncryptPassword).subscribe((resFormApi:any) => {
    console.log('res',resFormApi);
    
    if (resFormApi['Identity']) {

      var Id = resFormApi['Identity'];

      var decryptId = CryptoJS.AES.decrypt(Id, key,{  mode: CryptoJS.mode.CBC ,iv:i_v , keySize:256/8 }).toString(CryptoJS.enc.Utf8);

      var verify_uniqueID = decryptId.slice(0, 8);
      
      if ((resFormApi['access_token']) ) {

        console.log("login successfully",verify_uniqueID);
  
        localStorage.setItem('token', resFormApi['access_token']);
        //data['imei'] = this.device.uuid
        var imei = data['imei'] = '902738515d1d9b06';

        var encryptCheckUser = CryptoJS.AES.encrypt(user, key,
          {  mode: CryptoJS.mode.CBC ,iv:i_v , keySize:256/8 }).toString();
        console.log('encryptCheckUser',encryptCheckUser);

        //data['imei'] = this.device.uuid
        var imei = data['imei'] = '902738515d1d9b06';
        this.loginService.login( encryptCheckUser,encryptCheckPassword,imei).subscribe((resFormApi: any) => {
          this.loading.dismiss();
          console.log("response", JSON.parse(resFormApi))
          let response = JSON.parse(resFormApi)
          if (response.LogInStatus == "Success") {
            localStorage.setItem('GroupId', response.GroupId)
            localStorage.setItem('UserId', response.UserId)
            localStorage.setItem('apiUrl', environment.ipPort)
            // localStorage.setItem('userName', this.loginForm.get('username').value)
            localStorage.setItem('AdminType', response.AdminType)
            localStorage.setItem('remberMe', this.remberMe)
            if (this.remberMe) {
              // localStorage.setItem('password', this.loginForm.get('password').value)
            }
            this.route.navigateByUrl('tabs/tab1')
          } else {
            this.presentToast(response['LogInStatus'])
            this.loading.dismiss()
          }
        }, (err: any) => {
          console.log(err)
          this.loading.dismiss()
          this.presentToast('Unable to reach server! Please verify the SAMA MP URL and contact Administrator.')
        })
      }
      
    } else {
      this.loading.dismiss()
      this.presentToast(resFormApi['error_description'])
    }
  }, (err: any) => {
    console.log(err)
    this.loading.dismiss()
    this.presentToast('Unable to reach server! Please verify the SAMA MP URL and contact Administrator.')
  })
}
async presentToast(message: any) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}



}