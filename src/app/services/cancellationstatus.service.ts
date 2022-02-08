import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Cancellationstatus } from '../interfaces/cancellationstatus';

@Injectable({
  providedIn: 'root'
})
export class CancellationstatusService {
  
  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/cancellationstatus';
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getStatus(token : string) : Observable<Cancellationstatus[]> {
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Cancellationstatus[]>(this.url,httpOption).pipe(catchError(this.handleError));
  }

  // get sorted data

  getSortedStatus(token : string,flag : number) : Observable<Cancellationstatus[]> {
    this.endpoints = "/sorted/"+flag;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Cancellationstatus[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  getStatusById(token : string,id:number) : Observable<Cancellationstatus> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Cancellationstatus>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  addCancellationStatus(status : Cancellationstatus,token : string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Cancellationstatus[]>(this.url,status,httpOption,).pipe(catchError(this.handleError));
  }

  updateCancellationStatus(status : Cancellationstatus,token : string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Cancellationstatus[]>(this.url,status,httpOption).pipe(catchError(this.handleError));
  }

  deleteStatus(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
