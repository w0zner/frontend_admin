import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = GLOBAL.url + 'permisos/'
  }

  listar() {
    return this.http.get(this.url)
  }

  obtenerPorId(id: any) {
    return this.http.get(this.url + id)
  }

  guardar(data: any) {
    return this.http.post(this.url, data)
  }

  actualizar(id: string, data:any) {
    return this.http.put(this.url + id, data)
  }

  eliminar(id:any) {
    return this.http.delete(this.url + id)
  }

}
