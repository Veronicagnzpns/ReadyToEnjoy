import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AddActivityComponent} from './components/add-activity/add-activity.component'
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AddActivityComponent,
    EditActivityComponent,
    ConfirmDeleteComponent
    
  ],
  exports:[
    HeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AddActivityComponent,
    EditActivityComponent,
    ConfirmDeleteComponent
   ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SharedModule { }
