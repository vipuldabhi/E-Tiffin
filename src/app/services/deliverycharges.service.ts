import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Deliverycharges } from '../interfaces/deliverycharges';

@Injectable({
  providedIn: 'root'
})
export class DeliverychargesService {

  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient) {
    this.url = 'api/deliverycharges';
  }

  handleError(err:any){
    return throwError(()=>err);       
  }

  getDeliveryCharges() : Observable<Deliverycharges[]> {
   
    return this.http.get<Deliverycharges[]>(this.url).pipe(catchError(this.handleError));
  }

  getDeliveryChargeById(id:number) : Observable<Deliverycharges> {
    this.endpoints = "/"+id;
   
    return this.http.get<Deliverycharges>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  addDeliveryCharge(deliverycharges : Deliverycharges,token : string) : Observable<Deliverycharges[]>{
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Deliverycharges[]>(this.url,deliverycharges,httpOption).pipe(catchError(this.handleError));
  }

  updateDeliveryCharge(deliverycharges : Deliverycharges,token : string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Deliverycharges[]>(this.url,deliverycharges,httpOption).pipe(catchError(this.handleError));
  }

  deleteDeliveryCharge(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));

  }
}
