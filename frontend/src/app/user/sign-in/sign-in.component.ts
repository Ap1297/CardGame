import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service'; 
import { NgForm }   from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  constructor(public userService : UserService, private router: Router) { }
userDetails;
model ={
    email:'',
    password:''
};

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;


  ngOnInit() {
  
    if(this.userService.isLoggedIn())
    {
    this.router.navigateByUrl('/home');
    }
  }
  
  onSubmit(form : NgForm){
  
  this.userService.login(form.value).subscribe(
    res =>{
    console.log('Successful registration');
    console.log(form);
        this.userService.setToken(res['token']);
        this.userDetails = res['user'];
        if(this.userDetails.userType=='A')
            {
                 this.router.navigateByUrl('/admin');
            }
        else
            {
                 this.router.navigateByUrl('/home');
            }
    },
    err => {
    console.log('failed registration');
    console.log(form);
    this.serverErrorMessages = err.error.message;
    
    }
  
  );
  
  }

}
