import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Daywisemenu } from '../interfaces/daywisemenu';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url1 : string;
  url : string;
  endpoints : string = "";

  constructor(private http : HttpClient) { 
    this.url1 = "/api/daywisemenu"
    this.url = "api/menu";
  }

  //get daywisemenu from daywisemenu view of database
  getMenu(interval:string,dayid:number,resname:string) : Observable<Daywisemenu[]>{

    let endpoints = "/"+interval+"/day/"+dayid+"/restaurant/"+resname;
    return this.http.get<Daywisemenu[]>(this.url1+endpoints);
  } 
  
  handleError(err:any){
    return throwError(()=>err);
  }

  getAllMenu(token : string) : Observable<Menu[]> {
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Menu[]>(this.url,httpOption).pipe(catchError(this.handleError));
  }

  getMenuById(token:string,id:number):Observable<Menu>{
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Menu>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  addMenu(menu : Menu,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Menu>(this.url,menu,httpOption).pipe(catchError(this.handleError));
  }

  editMenu(menu : Menu,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Menu>(this.url,menu,httpOption).pipe(catchError(this.handleError));
  }

  deleteMenu(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

}       
