import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/core/interfaces/actividad';
import { UserRegister } from 'src/app/core/interfaces/user-register';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AddActivityComponent } from 'src/app/shared/components/add-activity/add-activity.component';
import { EditActivityComponent } from 'src/app/shared/components/edit-activity/edit-activity.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  actividades: Actividad[] =[]

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
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

  getActividades(){
   // let user: UserRegister = this.utilsSvc.getElementFromLocalStorage('user')
    let sub = this.firebaseSvc.getActivities().subscribe({
      next: (res) => {
        console.log(res);
        this.actividades = res;
      }
    })
  }

}
