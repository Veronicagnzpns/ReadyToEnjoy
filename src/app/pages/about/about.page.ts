import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(    
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService) { }

  ngOnInit() {
  }
  translateEs(){
    this.utilsSvc.setLang('es')

  }
  translateEn(){
    this.utilsSvc.setLang('en')
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
