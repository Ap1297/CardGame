import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';


const routes: Routes = [
  { path:'',redirectTo:'/login',pathMatch:'full' },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  {
    path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
  },
  { path: 'signup', component: UserComponent ,  children : [{path: '', component:SignUpComponent }]  },
  { path: 'login', component: UserComponent ,  children : [{path: '', component:SignInComponent }]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
