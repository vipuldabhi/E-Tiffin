import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ratings } from '../interfaces/ratings';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient) {
    this.url = 'api/ratings';
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getRatings() : Observable<Ratings[]> {
    return this.http.get<Ratings[]>(this.url).pipe(catchError(this.handleError));
  }

  getRatingById(token : string,id:number) : Observable<Ratings> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Ratings>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  getRatingsByRestaurantId(restaurantId : number) : Observable<Ratings[]> {
    this.endpoints = "/restaurant/"+restaurantId;
    return this.http.get<Ratings[]>(this.url).pipe(catchError(this.handleError));
  }

  addRatings(ratings : Ratings,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Ratings>(this.url,ratings,httpOption).pipe(catchError(this.handleError));
  }

  editRatings(ratings : Ratings,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Ratings>(this.url,ratings,httpOption).pipe(catchError(this.handleError));
  }

  deleteRatings(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
