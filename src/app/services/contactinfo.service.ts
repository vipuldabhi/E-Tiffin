import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Contactinfo } from '../interfaces/contactinfo';

@Injectable({
  providedIn: 'root'
})
export class ContactinfoService {

  url: string;
  endpoints : string = "";
  controls: any;

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/contactinfo';
  }

  getContactInfo(token : string) : Observable<Contactinfo[]> {
    this.endpoints = "/unsolved";
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Contactinfo[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  // get sorted data

  getSortedContactData(token : string,flag : number) : Observable<Contactinfo[]> {
    this.endpoints = "/sorted/"+flag;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Contactinfo[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  getContactInfoById(token : string,id:number) : Observable<Contactinfo[]> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Contactinfo[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  addContactInfo(contact : Contactinfo,token : string) : Observable<Contactinfo[]>{
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Contactinfo[]>(this.url,contact,httpOption).pipe(catchError(this.handleError));
  }

  handleError(err:any){
    return throwError(()=>err);       
  }

  updateContactInfo(contact : Contactinfo,token : string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Contactinfo[]>(this.url,contact,httpOption).pipe(catchError(this.handleError));
  }

  deleteContactInfo(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));

  }
}
