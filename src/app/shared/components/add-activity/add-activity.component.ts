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

  @Input() actividad: Actividad;
  user = {} as UserRegister
  photos: string[]= [];

  form = new FormGroup({
    foto:new FormControl('',),
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
    this.user = this.utilsSvc.getElementFromLocalStorage('user')
    if(this.actividad){
      //this.form.setValue(this.actividad);
      this.form.updateValueAndValidity()
    }
  }

  async takePhoto(){
    await this.postSvc.addNewPhoto();
  }

}
