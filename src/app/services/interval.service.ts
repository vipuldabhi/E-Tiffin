import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Interval } from '../interfaces/interval';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/interval';
  }

  getInterval() : Observable<Interval[]> {
    return this.http.get<Interval[]>(this.url).pipe(catchError(this.handleError));
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  addInterval(interval : Interval,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Interval>(this.url,interval,httpOption).pipe(catchError(this.handleError));
  }

  getIntervalById(id:number):Observable<Interval>{
    this.endpoints = "/"+id;
    return this.http.get<Interval>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  editInterval(interval : Interval,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Interval>(this.url,interval,httpOption).pipe(catchError(this.handleError));
  }

  deleteInterval(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

}
