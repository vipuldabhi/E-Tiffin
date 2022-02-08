import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Avgratings } from '../interfaces/avgratings';
import { Restaurants } from '../interfaces/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  url:string;
  endpoints : string = "";

  constructor(private http:HttpClient) { 
    this.url = "api/restaurant";
  }

  //get all restaurant data from database table restaurants
  getRestaurants() : Observable<Restaurants[]>{
    return this.http.get<Restaurants[]>(this.url);
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getRestaurantById(id:number){
    this.endpoints = "/"+id;
    return this.http.get<Restaurants>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  getSortedRestaurant(sortid : number){
    this.endpoints = "/sorted/"+sortid;
    return this.http.get<Restaurants[]>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  addRestaurant(restaurant : Restaurants,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Restaurants>(this.url,restaurant,httpOption).pipe(catchError(this.handleError));
  }

  editRestaurant(restaurant : Restaurants,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Restaurants>(this.url,restaurant,httpOption).pipe(catchError(this.handleError));
  }

  deleteRestaurant(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

}
