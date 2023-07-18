import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router:Router,private service:SharedServiceService){}

  hide = true;
  emailControl= new FormControl('', [Validators.required, Validators.email]);
  email =""
  password="";
  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  back(){
    this.router.navigateByUrl('/');
  }

  

  getPasswordErrorMessage(){
    if (!this.password) {
      return 'You must enter a value';
    }
    return""
  }
  
  async logIn(){
    //let url="http://127.0.0.1:8000/"
    let url="https://backend.kbl-developement.de/"
    if(this.getPasswordErrorMessage()==""){
     console.log("ready to send")
     let loginData={
       email:this.email,
       password:this.password
     }
     let body=JSON.stringify(loginData)
     //fetch server for registration
     await this.postToBackend(body,url)
     this.service.headLogText="Ausloggen"
     console.log(this.service.headLogText)
    }
    
   
     }
     async postToBackend(body:any,url:any){
      try{
        let response=await fetch(url + 'login/',{
          method: "POST",
          headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: body,
        mode: "cors",});
        let json=await response.json();
        console.log(json)
        localStorage.setItem('token','Token '+json.token)
        console.log("Token set!")
         // this.router.navigateByUrl('mainpage')
         this.service.updateHeadLogText();
         this.service.token=json.token
      console.log(this.service.headLogText);
      this.router.navigateByUrl('mainpage')
      }catch (error){
        console.error(error);
      }
  
    }
    

  
}
