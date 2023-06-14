import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
 
  constructor(private router:Router,private service:SharedServiceService){
    this.service.headLogText="Einloggen";
  }
  
  
  
  getLogin(){
  this.router.navigateByUrl('/login');
  }

  

  getRegistration(){
    this.router.navigateByUrl('/registration');
  }
}
