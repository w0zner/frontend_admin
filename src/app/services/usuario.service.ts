import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url
  }

  listar(tipo: any, filtro: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get(this.url + 'usuarios/'+tipo+"/"+filtro, {headers: headers})
  }
}
