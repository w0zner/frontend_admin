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
    return this.http.get(this.url + '/obtener-ventas/'+desde + '/' +hasta)
  }

  obtenerVentaPorId(id: any) {
    return this.http.get(this.url + "/obtener-venta-admin/" + id);
  }

  actualizarEstado(id: any, estado: any) {
    return this.http.put(this.url + "/actualizar-estado/" + id, estado,)
  }

  obtenerVentaPorNroVenta(nventa: any) {
    return this.http.get(this.url + "/obtener-ventas-nventa/" + nventa,);
  }

  obtenerVentaPorEstado(estado: any) {
    return this.http.get(this.url + "/obtener-ventas-estado/" + estado,);
  }

  //KPI
  obtenerKpiGanancias() {
    return this.http.get(this.url + "/obtener-kpi-ganancias/");
  }

  obtenerKpiCantidad() {
    return this.http.get(this.url + "/obtener-kpi-cantidad/");
  }
}
