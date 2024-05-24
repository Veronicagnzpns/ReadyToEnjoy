import { Component, OnInit } from '@angular/core';
import { UserRegister } from 'src/app/core/interfaces/user-register';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  user = {} as UserRegister

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { 
    
  }

  ngOnInit() {
  }



  getUser(){
    return this.user = this.utilsSvc.getElementFromLocalStorage('user')
  }

  signOut(){

    this.utilsSvc.presentAlert({
    header: 'Cerrar Sesión',
    message: '¿Estas seguro que quieres cerrar sesion?',
    mode: 'ios',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },{
        text: 'Si, cerrar',
        handler: () => {
          this.firebaseSvc.singOut();
        }
      }

    ]
    })
  }





}
