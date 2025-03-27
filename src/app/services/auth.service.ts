import { Injectable } from '@angular/core';
import {GLOBAL} from './GLOBAL'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url
  }

  getToken():any {
    return localStorage.getItem('token')
  }

  loginAdmin(data: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.url + 'login/admin', data, {headers: headers}).pipe(
      tap((response:any) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('_id', response.data._id)
      })
    )
  }

  public isAuthenticated(allowedRoles: string[]): boolean{
    const token = localStorage.getItem('token') || ''
    if(!token) {
      return false
    }

    try {
      var decode = this.jwtHelper.decodeToken(token)
      if(!decode) {
        localStorage.removeItem('token')
        return false
      }

      const expired = this.jwtHelper.isTokenExpired(token)

      if(expired) {
        //localStorage.removeItem('token')
        //return false

        this.refreshAdmin().subscribe({
          next: () => {
            return true
          },
          error:(err) => {
            console.log(err)
            localStorage.removeItem('token')
            return false
          }
        })
      }
    } catch (error) {
      localStorage.removeItem('token')
      return false
    }

    return allowedRoles.includes(decode['role'])
  }

  refreshAdmin() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.url + 'login/admin/refresh',{}, { withCredentials: true }).pipe(
      tap((response:any) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('_id', response.data._id)
      })
    )
  }
}
