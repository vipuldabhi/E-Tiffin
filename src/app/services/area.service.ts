import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Area } from '../interfaces/area';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  url: string;
  token : any;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/area';
  }

  getArea() : Observable<Area[]> {
    return this.http.get<Area[]>(this.url).pipe(catchError(this.handleError));
  }

  getAreaById(id:number) : Observable<Area> {
    this.endpoints = "/"+id;
    return this.http.get<Area>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  getSortedArea(flag : number) : Observable<Area[]> {
    this.endpoints = "/sorted/"+flag;
    return this.http.get<Area[]>(this.url+this.endpoints).pipe(catchError(this.handleError));
  }

  handleError(err:any){
    return throwError(()=>err);
  }


  addArea(area : Area,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Area>(this.url,area,httpOption).pipe(catchError(this.handleError));
  }

  editArea(area : Area,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Area>(this.url,area,httpOption).pipe(catchError(this.handleError));
  }

  deleteArea(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }
}
