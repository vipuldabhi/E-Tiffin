import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignIn } from '../interfaces/sign-in';
import { SignUp } from '../interfaces/sign-up';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginurl: string;
  registerurl: string;
  endpoints: string = '';
  checkLogin : boolean = false;

  constructor(private http: HttpClient) {
    this.loginurl = 'api/account/login';
    this.registerurl = 'api/account/signup';
  }

  isLogin(){
    if(localStorage.getItem('adminToken') ){         
      return true;
    }
    else if(localStorage.getItem('userToken')){
      return true;
    }
    else if(localStorage.getItem('deliveryboyToken')){
      return true;
    }
    else{                       
      return false;      
    }
  }


  isAdmin(){
    if(localStorage.getItem('adminToken')){
      return true;
    }else{
      return false;
    }
  }

  isDeliveryBoy(){
    if(localStorage.getItem('deliveryboyToken')){
      return true;
    }else{
      return false;
    }
  }

  isUser(){
    if(localStorage.getItem('userToken')){
      return true;
    }else{
      return false;
    }
  }

  //User Login Method which is call api method for user login

  loginUser(loginData: SignIn): Observable<any> {
    this.endpoints = '/user';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.loginurl + this.endpoints, loginData, {
      headers: headers,
    });
  }

  // Delivery Boy Login Method which is call api

  loginDeliveryboy(loginData: SignIn): Observable<any> {
    this.endpoints = '/deliveryboy';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.loginurl + this.endpoints, loginData, {
      headers: headers,
    });
  }


  // Delivery Boy Login Method which is call api

  loginAdmin(loginData: SignIn): Observable<any> {
    this.endpoints = '/admin';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.loginurl + this.endpoints, loginData, {
      headers: headers,
    });
  }


  //Register Method


  // User Register Method which is call api

  registerUser(registerData: SignUp): Observable<any> {
    this.endpoints = '/user';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.registerurl + this.endpoints, registerData, {
      headers: headers,
    });
  }
                      

  // Delivery Boy Register Method which is call api

  registerDeliveryboy(registerData: SignUp): Observable<any> {     
    this.endpoints = '/deliveryboy';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.registerurl + this.endpoints, registerData, {
      headers: headers,
    });
  }


  // Admin Register Method which is call api

  registerAdmin(registerData: SignUp): Observable<any> {
    this.endpoints = '/admin';

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.registerurl + this.endpoints, registerData, {
      headers: headers,
    });
  }

}
                                                                