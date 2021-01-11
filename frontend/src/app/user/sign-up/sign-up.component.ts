import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user.service'
import { NgForm }   from '@angular/forms';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {

showSucessMessage: boolean;
serverErrorMessages: string;
ipAddress: '';
UserType;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public userService: UserService,private http:HttpClient) { }

  ngOnInit() {
        this.getIPAddress();
      this.UserType='U';
  }
  
  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

 resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      ipaddress: '',
      mobileNo:'',
      userType: '' 
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  getIPAddress()

  {

    this.http.get("https://cors-anywhere.herokuapp.com/http://api.ipify.org?format=json").subscribe((res:any)=>{

      this.ipAddress = res.ip;

    });

  }
  
}