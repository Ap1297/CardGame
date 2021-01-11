import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user.service'
import { NgForm }   from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
    providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {

    showSucessMessage: boolean;
    serverErrorMessages: string;

  constructor(public userService: UserService) { }

model ={
    email:'',
    password:'',
    confirm:''
};
emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit() {
  }

    onSubmit(form: NgForm) {
    this.userService.resetUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 6000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 302) {
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

}
