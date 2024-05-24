import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from 'src/app/core/interfaces/user-register';
import { PasswordValidation } from 'src/app/core/validators/pasword';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent  implements OnInit {
  @Output() onsubmit = new EventEmitter<UserRegister>();

  form:FormGroup|null = null;

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group(
      {
        name:['',[Validators.required]],
        surname:['',[Validators.required]],
        nickname:['',[Validators.required]],
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required, PasswordValidation.passwordProto('password')]],
        confirm:['',Validators.required, PasswordValidation.passwordProto('confirm')]
      },{validator:[PasswordValidation.passwordMatch('password','confirm') ]}
    )
   }

  ngOnInit() {}

  hasError(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.invalid;
  }

  hasTouched(controlName:string):boolean|undefined{
    return this.form?.get(controlName)?.touched;
  }
}
