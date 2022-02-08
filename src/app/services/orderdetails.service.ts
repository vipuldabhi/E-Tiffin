import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Orderdetails } from '../interfaces/orderdetails';
import { Revenuefromorder } from '../interfaces/revenuefromorder';
import { Totalrevenue } from '../interfaces/totalrevenue';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

 
  url: string;
  endpoints : string = "";

  constructor(private http: HttpClient,private router : Router) {
    this.url = 'api/orderdetail';
  }

  handleError(err:any){
    return throwError(()=>err);
  }

  getOrderdetails(token : string) : Observable<Orderdetails[]> {
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Orderdetails[]>(this.url,httpOption);
  }

  //get sorted data

  getSortedOrderdetails(token : string,flag : number,reference : number) : Observable<Orderdetails[]> {
    this.endpoints = "/sorted/"+flag+"/"+reference;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Orderdetails[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }


  getOrderdetailsById(token : string,id:number) : Observable<Orderdetails> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Orderdetails>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }


  // get order details by user id

  getOrderdetailsByUserId(token : string,id:number) : Observable<Orderdetails> {
    this.endpoints = "/userid/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Orderdetails>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }


  getOrderById(token : string,id : number) : Observable<Orderdetails> {
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Orderdetails>(this.url+this.endpoints,httpOption);
  }
 

  addOrder(orderdetails : Orderdetails,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.post<Orderdetails>(this.url,orderdetails,httpOption).pipe(catchError(this.handleError));
  }

  editOrder(orderdetails : Orderdetails,token:string){
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.put<Orderdetails>(this.url,orderdetails,httpOption).pipe(catchError(this.handleError));
  }

  deleteOrder(token : string,id:number){
    this.endpoints = "/"+id;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.delete(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  //get orders between tow dates

  getOrderBetweenTwoDates(token:string,startdate : any,enddate:any):Observable<Orderdetails[]>{
    this.endpoints = "/startdate/"+startdate+"/enddate/"+enddate;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Orderdetails[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }


  //get orders between tow dates

  getOrderOfTheMonth(token:string,month : number,year:number):Observable<Orderdetails[]>{
    this.endpoints = "/month/"+month+"/year/"+year;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Orderdetails[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  // get total revenue between given date

  getRevenueBetweenTwoDates(token:string,startdate : any,enddate:any):Observable<Revenuefromorder[]>{
    this.endpoints = "/revenue/startdate/"+startdate+"/enddate/"+enddate;
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Revenuefromorder[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

  // get total revenue

  getTotalRevenue(token:string):Observable<Totalrevenue[]>{
    this.endpoints = "/totalrevenue";
    const httpOption = {headers : new HttpHeaders({'Content-Type':'Application/json',Authorization:"Bearer " + token})};
    return this.http.get<Totalrevenue[]>(this.url+this.endpoints,httpOption).pipe(catchError(this.handleError));
  }

}
