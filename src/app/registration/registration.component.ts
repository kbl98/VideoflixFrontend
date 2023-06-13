import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private router:Router){

  }
  confirmPassword="";
  password="";
  hide = true;
  hideConfirm=true;
  email = new FormControl('', [Validators.required, Validators.email]);
  back(){
    this.router.navigateByUrl('/');
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getConfirmPasswordErrorMessage() {
    if (!this.confirmPassword) {
      return 'You must enter a value';
    }
    if (this.password!== this.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  }

  registrate(){
   if(this.getConfirmPasswordErrorMessage()=="" && this.getErrorMessage()==""){
    console.log("ready to send")
    let body=JSON.stringify({
      email:this.email,
      password:this.password
    })
    //fetch server for registration
   }
    }
  }


