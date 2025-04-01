import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;
  private headers: any

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = GLOBAL.url
    this.headers = this.authService.getHeaders()
  }

  listar(tipo: any, filtro: any) {
    return this.http.get(this.url + 'usuarios/'+tipo+"/"+filtro, {headers: this.headers})
  }

  registrar(data: any) {
    return this.http.post(this.url + 'usuarios', data, {headers: this.headers})
  }
}
