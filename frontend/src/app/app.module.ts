// Support Component
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2OdometerModule } from 'ng2-odometer';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgwWowModule } from 'ngx-wow';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/user.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    Ng2OdometerModule.forRoot(),
    SlickCarouselModule, NgwWowModule,  NgbModule,FormsModule,HttpClientModule
  
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy},AuthGuard,UserService,{provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true}],
    bootstrap: [AppComponent]
})
export class AppModule { }
