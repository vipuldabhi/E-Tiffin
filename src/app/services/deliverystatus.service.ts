import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Deliverystatus } from '../interfaces/deliverystatus';

@Injectable({
  providedIn: 'root'
})
export class DeliverystatusService {

  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/deliverystatus';
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getDeliveryStatus(token : string) : Observable<Deliverystatus[]> {
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Deliverystatus[]>(this.url,httpOption).pipe(catchError(this.handleError));
  }

  getDeliveryStatusById(token : string,id:number) : Observable<Deliverystatus[]> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Deliverystatus[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  addDeliveryStatus(deliverystatus : Deliverystatus,token : string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Deliverystatus[]>(this.url,deliverystatus,httpOption,).pipe(catchError(this.handleError));
  }

  updateDeliveryStatus(deliverystatus : Deliverystatus,token : string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Deliverystatus[]>(this.url,deliverystatus,httpOption).pipe(catchError(this.handleError));
  }

  deleteDeliveryStatus(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
