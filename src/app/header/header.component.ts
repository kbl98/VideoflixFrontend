import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private router:Router,private service:SharedServiceService){
  
  }

  headLogText="";
  ngOnInit() {
    this.headLogText = this.service.headLogText; // Initialen Wert setzen

    // Änderungen an headLogText überwachen
    this.service.headLogTextChanged.subscribe((newText: string) => {
    this.headLogText = newText;
    });
  }
  getLogin(){
    if(this.headLogText=="Einloggen"){
    this.router.navigateByUrl('/login');
    }
    else{
      this.service.updateHeadLogText();
      this.service.token="";
      localStorage.setItem("token","")
      this.router.navigateByUrl('');
      
    }
  }

}
