import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-get-pw',
  templateUrl: './get-pw.component.html',
  styleUrls: ['./get-pw.component.scss'],
})
export class GetPwComponent {
  constructor(private router: Router) {}

  hide = true;
  hideConfirm = true;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  email = '';

  back() {
    this.router.navigateByUrl('/');
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  async getEmail() {
    //let url="http://127.0.0.1:8000/"
    let url = 'https://backend.kbl-developement.de/';
    if (this.getErrorMessage() == '') {
      let registrationData = {
        email: this.email,
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
        this.router.navigateByUrl('registration');
      }
    }
  }

  async postToBackend(body: any, url: any) {
    try {
      let response = await fetch(url + 'reset/', {
        method: 'POST',
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
