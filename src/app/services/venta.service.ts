import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url: string;
  private headers: any

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = GLOBAL.url + 'ventas'
    this.headers = this.authService.getHeaders()
  }

  obtenerVentas(desde: any, hasta: any) {
    return this.http.get(this.url + '/obtener-ventas/'+desde + '/' +hasta , {headers: this.headers})
  }
}
