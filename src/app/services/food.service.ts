import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable, catchError } from 'rxjs';
import { Duration } from '../interfaces/duration';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  url: string;
  token : any;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/food';
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getFood(token : string) : Observable<Food[]> {
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Food[]>(this.url,httpOption).pipe(catchError(this.handleError));
  }

  getFoodById(token : string,id:number) : Observable<Food> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Food>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  addFood(food : Food,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Food>(this.url,food,httpOption).pipe(catchError(this.handleError));
  }

  editFood(food : Food,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Food>(this.url,food,httpOption).pipe(catchError(this.handleError));
  }

  deleteFood(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
