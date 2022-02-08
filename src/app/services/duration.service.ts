import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Duration } from '../interfaces/duration';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  url: string;
  token : any;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/duration';
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getDuration() : Observable<Duration[]> {
    return this.http.get<Duration[]>(this.url).pipe(catchError(this.handleError));
  }

  getDurationById(id:number) : Observable<Duration> {
    this.endpoints = "/"+id;
    return this.http.get<Duration>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  addDuration(duration : Duration,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Duration>(this.url,duration,httpOption).pipe(catchError(this.handleError));
  }

  editDuration(duration : Duration,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Duration>(this.url,duration,httpOption).pipe(catchError(this.handleError));
  }

  deleteDuration(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
