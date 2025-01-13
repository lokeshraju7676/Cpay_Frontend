import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private http:HttpClient) { }
   // Login method
   login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, loginData);
  }
  signup(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, registerData);
  }
}