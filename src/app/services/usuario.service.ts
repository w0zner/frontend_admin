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

  listar(tipo: any, filtro: any, token: any) {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token})
    return this.http.get(this.url + 'usuarios/'+tipo+"/"+filtro, {headers: headers})
  }

  registrar(data: any, token: any) {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token})
    return this.http.post(this.url + 'usuarios', data, {headers: headers})
  }
}
