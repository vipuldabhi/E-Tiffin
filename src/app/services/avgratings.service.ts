import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avgratings } from '../interfaces/avgratings';

@Injectable({
  providedIn: 'root',
})
export class AvgratingsService {
  url: string;
  endpoints: string = '';

  constructor(private http: HttpClient) {
    this.url = 'api/avgrating';
  }

  getAvgRatings(): Observable<Avgratings[]> {
    return this.http.get<Avgratings[]>(this.url);
  }

  getsorteddata(sortid : number): Observable<Avgratings[]> {
    this.endpoints = "/sorted/"+sortid;
    return this.http.get<Avgratings[]>(this.url+this.endpoints);
  }
}
