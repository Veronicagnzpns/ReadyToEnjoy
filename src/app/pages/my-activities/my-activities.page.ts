import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Actividad } from 'src/app/core/interfaces/actividad';
import { UserRegister } from 'src/app/core/interfaces/user-register';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AddActivityComponent } from 'src/app/shared/components/add-activity/add-activity.component';
import { ConfirmDeleteComponent } from 'src/app/shared/components/confirm-delete/confirm-delete.component';
import { EditActivityComponent } from 'src/app/shared/components/edit-activity/edit-activity.component';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.page.html',
  styleUrls: ['./my-activities.page.scss'],
})
export class MyActivitiesPage implements OnInit {

  @Input() actividad: Actividad;

  actividades: Actividad[] =[]


  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getActividades()
  }

  addActivities( ){
    this.utilsSvc.presentModal({
      component: AddActivityComponent,
      componentProps:{},
      cssClass: 'add-modal'
    })
  }

  editActivities(actividad: Actividad){
    this.utilsSvc.presentModal({
      component: EditActivityComponent,
      componentProps:{ actividad },
      cssClass: ''
    })
  }

  confirmDelete(){
    this.utilsSvc.presentModal({
      component: ConfirmDeleteComponent,
      cssClass: ''
    })
  }

  getActividades(){
    let user: string = this.utilsSvc.getElementFromLocalStorage('user')
    console.log(user)
    let sub = this.firebaseSvc.getMyActivities(user).subscribe({
      next: (res) => {
        console.log(res);
        this.actividades = res;
      }
    })
  }

  canDismiss = async (actividad: Actividad) => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estas seguro de eliminar la actividad '+ actividad.title +' ?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    if (role === 'confirm'){
      // llamamos fun eliminar
      console.log(actividad)
      this.firebaseSvc.deleteActivity(actividad)
    }
    
    return role === 'confirm';
  };



}
