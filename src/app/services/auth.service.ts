import { Injectable } from '@angular/core';
import {GLOBAL} from './GLOBAL'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, lastValueFrom, map, tap } from 'rxjs';
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
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('_id', response.data._id)
      })
    )
  }

  public async isAuthenticated(allowedRoles: string[]): Promise<boolean> {
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
        console.log(1)
        await lastValueFrom(this.refreshAdmin(localStorage.getItem('refreshToken')))
      /*   .subscribe({
          next: () => {
            console.log(2)
            return true
          },
          error:(err) => {
            console.log(3)
            console.log(err)
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            return false
          }
        }) */
      }
    } catch (error) {
      console.log(4)
      localStorage.removeItem('token')
      return false
    }

    return allowedRoles.includes(decode['role'])
  }

  refreshAdmin(refreshToken: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.url + 'login/admin/refresh', {refreshToken: refreshToken}, {headers: headers} /*{ withCredentials: true }*/).pipe(
      tap((response:any) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('_id', response.data._id)
      })
    )
  }
}
