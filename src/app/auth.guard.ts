import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedServiceService } from './shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private sharedService: SharedServiceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.sharedService.token=localStorage.getItem('token')
      if (this.sharedService.token) {
        return true;
      } else {
        // Wenn kein Token vorhanden ist, zur Login-Seite navigieren
        this.router.navigateByUrl('/login');
        return false;
      }
    }
  
  }
  

