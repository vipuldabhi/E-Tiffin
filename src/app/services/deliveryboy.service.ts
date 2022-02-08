import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Deliveryboy } from '../interfaces/deliveryboy';

@Injectable({
  providedIn: 'root'
})
export class DeliveryboyService {

  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient) {
    this.url = 'api/deliveryboy';
  }

  handleError(err:any){
    return throwError(()=>err);       
  }

  getDeliveryBoy(token : string) : Observable<Deliveryboy[]> {
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Deliveryboy[]>(this.url,httpOption).pipe(catchError(this.handleError));
  }


  //get sorted data

  getSortedData(token : string,flag : number,reference : number) : Observable<Deliveryboy[]> {
    this.endpoints = "/sorted/"+flag+"/"+reference;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Deliveryboy[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }


  getDeliveryBoyById(token : string,id:number) : Observable<Deliveryboy> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Deliveryboy>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  addDeliveryBoy(deliveryboy : Deliveryboy){
    return this.http.post(this.url,deliveryboy).pipe(catchError(this.handleError));
  }

  updateDeliveryBoy(deliveryboy : Deliveryboy,token : string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Deliveryboy[]>(this.url,deliveryboy,httpOption).pipe(catchError(this.handleError));
  }

  deleteDeliveryBoy(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
   return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
