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

  obtenerVentaPorId(id: any) {
    return this.http.get(this.url + "/obtener-venta-admin/" + id, { headers: this.headers });
  }

  actualizarEstado(id: any, estado: any) {
    return this.http.put(this.url + "/actualizar-estado/" + id, estado, { headers: this.headers })
  }

  obtenerVentaPorNroVenta(nventa: any) {
    return this.http.get(this.url + "/obtener-ventas-nventa/" + nventa, { headers: this.headers });
  }

  obtenerVentaPorEstado(estado: any) {
    return this.http.get(this.url + "/obtener-ventas-estado/" + estado, { headers: this.headers });
  }
}
