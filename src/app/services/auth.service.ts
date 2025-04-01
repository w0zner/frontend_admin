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
    this.url = GLOBAL.url + 'login/admin'
  }

  getToken():any {
    return localStorage.getItem('token')
  }

  getEmailLogged():any {
    return localStorage.getItem('usuario')
  }

  getHeaders() {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.getToken()})
    return headers;
  }

  loginAdmin(data: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.url, data, {headers: headers}).pipe(
      tap((response:any) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('_id', response.data._id)
        localStorage.setItem('usuario', response.data.email)
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
    return this.http.post(this.url + '/refresh', {refreshToken: refreshToken}, {headers: headers} /*{ withCredentials: true }*/).pipe(
      tap((response:any) => {
        localStorage.setItem('token', response.token)
        localStorage.setItem('_id', response.data._id)
      })
    )
  }

  logout(){
    localStorage.removeItem('_id')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.clear()
  }
}
