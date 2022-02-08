import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Mealcharges } from '../interfaces/mealcharges';

@Injectable({
  providedIn: 'root'
})
export class MealchargesService {

  url : string;
  endpoints : string = "";

  constructor(private http : HttpClient) { 
    this.url = "api/mealcharges";
  }

  getmealcharges(): Observable<Mealcharges[]> {
    return this.http.get<Mealcharges[]>(this.url).pipe(catchError(this.handleError));
  }

  getMealChargesById(token : string,id:number): Observable<Mealcharges> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Mealcharges>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  getsorteddata(sortid : number,intervalid : number): Observable<Mealcharges[]> {
    this.endpoints = "/sorted/"+sortid+"/interval/"+intervalid;
    return this.http.get<Mealcharges[]>(this.url+this.endpoints);
  }

  getMealChargesByResIdandIntervalId(resid : number,intervalid : number){
    this.endpoints = "/restaurantid/"+resid+"/intervalid/"+intervalid;
    return this.http.get<number>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  addMealCharge(mealcharges : Mealcharges,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Mealcharges>(this.url,mealcharges,httpOption).pipe(catchError(this.handleError));
  }

  editMealCharge(mealcharges : Mealcharges,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Mealcharges>(this.url,mealcharges,httpOption).pipe(catchError(this.handleError));
  }

  deleteMealCharge(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
