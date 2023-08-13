import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { VideodetailComponent } from './videodetail/videodetail.component';
import { RegulatoryComponent } from './regulatory/regulatory.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AuthGuard } from './auth.guard';
import { ResetComponent } from './reset/reset.component';
import { GetPwComponent } from './get-pw/get-pw.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'mainpage', component: MainpageComponent,canActivate: [AuthGuard]},
  { path: 'detail/:id', component: VideodetailComponent,canActivate: [AuthGuard]},
  { path: 'regulatory', component: RegulatoryComponent},
  { path: 'impressum', component: ImpressumComponent},
  { path: 'reset/:code', component: ResetComponent},
  { path: 'getpw', component:GetPwComponent},
  



  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
