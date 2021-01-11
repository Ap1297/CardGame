import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm }   from '@angular/forms';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  serverErrorMessages: string;
showSucessMessage: boolean;
ipAddress: '';
UserTypeAdmin;
UserTypeUsers;
model ={
    email:''
};
emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

UserType;
  constructor(public userService: UserService, private router: Router, private http:HttpClient) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
       this.getIPAddress();   
  }

onSubmit(form: NgForm) {
    this.userService.updateUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 6000);
        this.resetForm(form);
        window.location.reload();
      },
      err => {
        if (err.status === 302) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Please Check Email you entered!!';
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

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}