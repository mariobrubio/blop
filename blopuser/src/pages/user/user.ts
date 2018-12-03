import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { FirebaseUserModel } from '../core/user.model';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage{

  user: FirebaseUserModel = new FirebaseUserModel();
  sis: number;
  dia: number;

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService,
    public plt: Platform,
    public alertCtrl: AlertController,
    public localNotifications: LocalNotifications
    ) {
    }

  ionViewWillLoad(){
    this.userService.getCurrentUser()
    .then(user => {
      this.user = user;
    }, err => console.log(err))
  }


  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.navCtrl.pop();
    }, (error) => {
      console.log("Logout error", error);
    });
  }
  
  takebp() {
    this.sis=this.random(160,80);
    this.dia= this.sis - this.random(50,30);
    if (this.sis > 150 && this.dia > 100){
      this.plt.ready().then(() => {
        this.localNotifications.schedule({
          id:1,
          title: 'Presión alta',
          text: 'El paciente asociado presenta una tensión arterial elevada, necesita atención inmediata'
        });
      });
    }
  }
 
  random(max,min): number {
    let rand = Math.floor(Math.random()*(max-min+1)+min);;
    return rand;       
 }
}
