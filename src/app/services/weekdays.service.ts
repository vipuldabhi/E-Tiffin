import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Weekdays } from '../interfaces/weekdays';

@Injectable({
  providedIn: 'root'
})
export class WeekdaysService {

  url:string;
  endpoints : string = "";

  constructor(private http : HttpClient) { 
    this.url = "api/weekdays"
  }

  //get all weekdays data from weekdays table of database
  getDays() : Observable<Weekdays[]>{
    return this.http.get<Weekdays[]>(this.url);
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getWeekdayById(token:string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Weekdays>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  addWeekday(weekdays : Weekdays,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Weekdays>(this.url,weekdays,httpOption).pipe(catchError(this.handleError));
  }

  editWeekday(weekdays : Weekdays,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Weekdays>(this.url,weekdays,httpOption).pipe(catchError(this.handleError));
  }

  deleteWeekday(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

}
