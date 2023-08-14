import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  confirmPassword = '';
  password = '';
  hide = true;
  hideConfirm = true;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  email = '';
  resetCode = '';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.resetCode = params['code'];
      if (this.resetCode) {
      }
    });
  }

  back() {
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
    if (this.password !== this.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  }

  async reset() {
    //let url="http://127.0.0.1:8000/"
    let url = 'https://backend.kbl-developement.de/';
    if (
      this.getConfirmPasswordErrorMessage() == '' &&
      this.getErrorMessage() == ''
    ) {
      let registrationData = {
        email: this.email,
        password: this.password,
        resetCode: this.resetCode,
      };
      let body = JSON.stringify(registrationData);
      //fetch server for registration
      try {
        let response = await this.postToBackend(body, url);
        await this.emailSend();
        if (response.status === 200) {
          this.navigateLogin();
        } else this.router.navigateByUrl('registration');
      } catch (error) {
        console.log(error);
      }
    }
  }

  async postToBackend(body: any, url: any) {
    try {
      let response = await fetch(url + 'reset/', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: body,
        mode: 'cors',
      });
      let json = await response.json();
      return response;
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Not Found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  navigateLogin() {
    this.router.navigateByUrl('login');
  }

  async emailSend() {
    let element: any = document.getElementById('sent');

    element.style.display = 'block';
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
