import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actividad } from 'src/app/core/interfaces/actividad';
import { FirebaseService } from 'src/app/core/services/firebase/firebase.service';
import { PostService } from 'src/app/core/services/post.service';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss'],
})
export class EditActivityComponent  implements OnInit {


  @Input() actividad: Actividad;

  form: FormGroup;


  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
    private postSvc: PostService
  ) { }

  ngOnInit() {

    this.initForm();
  }



  initForm() {
    this.form = new FormGroup({
      photo: new FormControl(this.actividad?.photo || ''),
      title: new FormControl(this.actividad?.title || '', [Validators.required, Validators.minLength(4)]),
      description: new FormControl(this.actividad?.description || '', [Validators.required, Validators.minLength(4)]),
    });
  }

  async takePhoto(){
    await this.postSvc.addNewPhoto();
  }

  updateActivity(){
    this.actividad.title = this.form.controls['title'].value
    this.actividad.description = this.form.controls['description'].value
    this.actividad.photo = this.form.controls['photo'].value
    this.firebaseSvc.updateActivity(this.actividad)
  }

}
