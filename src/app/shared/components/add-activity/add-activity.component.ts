import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actividad } from 'src/app/core/interfaces/actividad';
import { UserRegister } from 'src/app/core/interfaces/user-register';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { PostService } from 'src/app/core/services/post.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
})
export class AddActivityComponent  implements OnInit {

  user = {} as UserRegister
  photos: string[]= [];

  form = new FormGroup({
    photo:new FormControl('',),
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    description: new FormControl('',[Validators.required, Validators.minLength(4)])
  })

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private postSvc: PostService
  ) { 

    this.photos = this.postSvc.photos;
  }

  ngOnInit() {
  }

  async takePhoto(){
    await this.postSvc.addNewPhoto();
  }


  addActivity(){
    let user: string = this.utilsSvc.getElementFromLocalStorage('user')
    let actividad: Actividad = {id:50, title: this.form.controls.title.value, description: this.form.controls.description.value, idAuthor: user, photo: this.form.controls.photo.value }

    //console.log(this.actividad)
    this.firebaseSvc.postActivity(actividad)
  }

}
