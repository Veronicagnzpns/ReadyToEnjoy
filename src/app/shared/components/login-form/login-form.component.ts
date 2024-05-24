import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/core/interfaces/user-login';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  @Input() icon:string;
  @Input() autocomplete:string;
  @Input() type:string;
  @Input() control:FormControl;
  @Input() label:string;
  @Input('username') set username(value:string){
    this.form?.controls[this.username].setValue(value)
  }

  isPassword: boolean;
  hide: boolean = true;

  @Output() onsubmit = new EventEmitter<UserLogin>();

  form:FormGroup|null = null;
  constructor(
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required]]
    });
    
   }

  ngOnInit() {
    if(this.type == 'password') this.isPassword = true;
  }

  onSubmit(){
    this.onsubmit.emit(this.form?.value);
    this.form?.controls['password'].setValue('');
  }

  eye(){
    this.hide = !this.hide;

    if(this.hide){
      this.type = 'password'
    }
    else{
      this.type = 'text'
    }
  }

}
