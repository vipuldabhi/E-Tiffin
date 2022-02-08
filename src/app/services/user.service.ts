import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient) {
    this.url = 'api/user';
  }

  getUser(token : string) : Observable<User[]> {
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<User[]>(this.url,httpOption).pipe(catchError(this.handleError));
  }

  //get sorted data

  getSortedUsers(token : string,flag : number,reference : number) : Observable<User[]> {
    this.endpoints = "/sorted/"+flag+"/"+reference;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<User[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  getUserById(token : string,id : number) : Observable<User> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<User>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  getUserIdByEmail(token:string,email:string) {
    this.endpoints = "/userid/"+email;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  getUserByEmail(token : string,email : string) : Observable<User> {
    this.endpoints = "/userdetails/"+email;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<User>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  addUser(user : User){
    return this.http.post<User>(this.url,user).pipe(catchError(this.handleError));
  }

  editUser(user : User,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<User>(this.url,user,httpOption).pipe(catchError(this.handleError));
  }

  deleteUser(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
