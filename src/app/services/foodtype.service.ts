import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Foodtype } from '../interfaces/foodtype';

@Injectable({
  providedIn: 'root'
})
export class FoodtypeService {

  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/foodtype';
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getFoodType() : Observable<Foodtype[]> {
    return this.http.get<Foodtype[]>(this.url).pipe(catchError(this.handleError));
  }

  getFoodTypeById(id:number) : Observable<Foodtype> {
    this.endpoints = "/"+id;
    return this.http.get<Foodtype>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  addFoodType(foodtype : Foodtype,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Foodtype>(this.url,foodtype,httpOption).pipe(catchError(this.handleError));
  }

  editFoodType(foodtype : Foodtype,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Foodtype>(this.url,foodtype,httpOption).pipe(catchError(this.handleError));
  }

  deleteFoodType(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
