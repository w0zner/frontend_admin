import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  private url: string;
  private headers: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url=GLOBAL.url + 'cupones'
    this.headers = this.authService.getHeaders()
  }

  listar() {
    return this.http.get(this.url, {headers: this.headers})
  }

  obtenerPorId(id: any) {
    return this.http.get(this.url + "/" +id, {headers: this.headers})
  }

  guardar(data: any) {
    return this.http.post(this.url, data, {headers: this.headers})
  }

  actualizar(id:any, data:any) {
    return this.http.put(this.url + "/" + id, data, {headers: this.headers})
  }

  eliminar(id: any) {
    return this.http.delete(this.url + "/" + id, {headers: this.headers})
  }
}
