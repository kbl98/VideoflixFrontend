import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router, private service: SharedServiceService) {
    this.service.headLogText = 'Einloggen';
  }

  ngOnInit(): void {
    this.service.token = localStorage.getItem('token');
    this.service.updateHeadLogText();
  }

  getLogin() {
    this.service.updateHeadLogText();
    this.router.navigateByUrl('/login');
  }

  getRegistration() {
    this.router.navigateByUrl('/registration');
  }
}
