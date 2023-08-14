import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regulatory',
  templateUrl: './regulatory.component.html',
  styleUrls: ['./regulatory.component.scss'],
})
export class RegulatoryComponent implements OnInit {
  constructor(private service: SharedServiceService, private router: Router) {}
  token: any = '';
  ngOnInit(): void {
    this.service.token = localStorage.getItem('token');
    this.service.updateHeadLogText();
  }

  getBack() {
    if (this.service.token) {
      this.router.navigateByUrl('mainpage');
    } else {
      this.router.navigateByUrl('');
    }
  }
}
