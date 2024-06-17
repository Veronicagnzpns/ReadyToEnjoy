import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from 'src/app/core/interfaces/user-register';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })

  private redirectUrl:string = "";
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { 
    }
  

  ngOnInit() {
  }

  submit(){
    if(this.form.valid){


      this.utilsSvc.presentLoading({message: 'En proceso...'})

      this.firebaseSvc.login(this.form.value as UserRegister).then(async res =>{
        console.log(res);

        this.utilsSvc.setElementInLocalstorage('user', res.user.uid)

        this.utilsSvc.routerLink('/home')

        this.utilsSvc.dismissLoading();

        this.utilsSvc.presentToast({
          message: 'Te has logeado correctamente',
          duration: 1500,
          color: 'primary' 
        })

        this.form.reset()

        
      }, error =>{
        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message: error,
          duration: 5000,
          color: 'warning' 
        })
        console.log(error);
        
      })
    

    }
  }

  

  

}
