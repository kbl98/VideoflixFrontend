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
  emailControl=new FormControl('', [Validators.required, Validators.email]);
  email ="";
  back(){
    this.router.navigateByUrl('/');
  }
  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
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

  async registrate(){
   //let url="http://127.0.0.1:8000/"
   let url="https://backend.kbl-developement.de/"
   if(this.getConfirmPasswordErrorMessage()=="" && this.getErrorMessage()==""){
    console.log("ready to send")
    let registrationData={
      email:this.email,
      password:this.password
    }
    let body=JSON.stringify(registrationData)
    //fetch server for registration
    await this.postToBackend(body,url)
   }
   
  
    }

  async postToBackend(body:any,url:any){
    try{
      let response=await fetch(url + 'register/',{
        method: "POST",
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: body,
      mode: "cors",});
      let json=await response.json();
      console.log(json)
     
        this.router.navigateByUrl('login')
    }catch (error){
      console.error(error);
    }

  }
  
    
  }


