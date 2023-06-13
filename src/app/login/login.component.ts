import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router:Router){}
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password="";
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  back(){
    this.router.navigateByUrl('/');
  }

  logIn(){
    let body=JSON.stringify({
      email:this.email,
      password:this.password
    })
  }

  getPasswordErrorMessage(){
    if (!this.password) {
      return 'You must enter a value';
    }
    return""
  }
  

}
