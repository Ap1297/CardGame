import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import { Contact } from './user.model';
import { AddLink } from './user.model';
import { AddNotification } from './user.model';
var date = new Date();
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    selectedUser : User = {
     fullName:'',
     email: '',
     password: '',
     ipaddress: '',
     mobileNo: '',
    userType: ''    
    };

    selectedContact : Contact = {
      fullName:'',
      email: '',
      subject: '',
      ipaddress: '',
      mobileNo: '',
      message: ''    
     };

     selectedAddLink : AddLink ={
      category:'',
      url:'',
      label:''
     };

     selectedAddNotification : AddNotification ={
      idNo:null,
      description: '',
      date: date.getDate()
     };
    
    constructor(private http: HttpClient){}
    
    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
    
    postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

    postContact(contact: Contact){
    return this.http.post(environment.apiBaseUrl+'/contactDetails',contact,this.noAuthHeader);
  }

  postUrlLink(addLink: AddLink){
    return this.http.post(environment.apiBaseUrl+'/addLink',addLink,this.noAuthHeader);
  }

  postAddNotification(addNotification: AddNotification){
    return this.http.post(environment.apiBaseUrl+'/addNotification',addNotification,this.noAuthHeader);
  }

    forgotUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/forgot',user,this.noAuthHeader);
  }
    
    resetUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/reset',user,this.noAuthHeader);
  }

    updateUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/updateUser',user,this.noAuthHeader);
  }

     login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
    
    setToken(token: string){
        return localStorage.setItem('token', token);
    }
    
    getToken() {
    
        return localStorage.getItem('token');
    }
    
    deleteToken(){
     return localStorage.removeItem('token');
    
    }
    
    getUserPayLoad(){
    
        var token = this.getToken();
        if(token){
            var userPayload = atob(token.split('.')[1]);
          
            return JSON.parse(userPayload);
        }
        else
            return null;
    
    }
    
    isLoggedIn(){
        var userPayload = this.getUserPayLoad();
        if(userPayload)
        {
          
            return userPayload.exp > Date.now() / 1000;
           
        }
        else 
        {
          return false;
        }
            
        
    }
    
    getUserProfile()
    {
       return this.http.get(environment.apiBaseUrl+'/userprofile');
    }

    getUserForAdmin()
    {
       return this.http.get(environment.apiBaseUrl+'/getUser');
    }

    deleteUserForAdmin(email:string)
    {
       return this.http.post(environment.apiBaseUrl+'/deleteUser',email,this.noAuthHeader);
    }

    getNotification()
    {
       return this.http.get(environment.apiBaseUrl+'/getNotification');
    }

    getUrlLinkDetails()
    {
       return this.http.get(environment.apiBaseUrl+'/getUrlLink');
    }
}