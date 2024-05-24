import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from 'src/app/core/interfaces/user-register';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { PasswordValidation } from 'src/app/core/validators/pasword';
import {  } from 'src/app/core/validators/pasword';
import { ValidatorsPass } from 'src/app/core/validators/validatorsPass';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,]),
    confirmPassword: new FormControl('',),
  })
  

  constructor(
   private firebaseSvc: FirebaseService,
   private utilsSvc: UtilsService,
  ) { 
    }
  

  ngOnInit() {
    this.confirmPasswordValidator()
  }

  confirmPasswordValidator(){
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      ValidatorsPass.matchValues(this.form.controls.password)
    ])

    this.form.controls.confirmPassword.updateValueAndValidity();

  }


  

  submit(){
    if(this.form.valid){


      this.utilsSvc.presentLoading({message: 'Registrando'})

      this.firebaseSvc.singUp(this.form.value as UserRegister).then(async res =>{
        console.log(res);


        await this.firebaseSvc.updateUser({displayname: this.form.value.name})
        this.utilsSvc.routerLink('/home')

        this.utilsSvc.dismissLoading();

        this.utilsSvc.presentToast({
          message: 'Te has registrado correctamente',
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