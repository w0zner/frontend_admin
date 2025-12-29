import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;
  private urlRoles: string;
  private headers: any

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = GLOBAL.url + 'usuarios'
    this.urlRoles = GLOBAL.url + 'roles'
    this.headers = this.authService.getHeaders()
  }

  listar(tipo: any, filtro: any) {
    return this.http.get(this.url + "/buscar/" + tipo + "/" + filtro, {headers: this.headers})
  }

  listarUsuarioSistemaAdmin(tipo: any, filtro: any) {
    return this.http.get(this.url + "/buscar-usuario-sistema/" + tipo + "/" + filtro, {headers: this.headers})
  }

  registrar(data: any) {
    return this.http.post(this.url, data, {headers: this.headers})
  }

  registrarUsuarioAdmin(data: any) {
    return this.http.post(this.url + '/registrar-usuario-admin', data, {headers: this.headers})
  }

  getById(id: any) {
    return this.http.get(this.url + "/" + id, {headers: this.headers})
  }

  update(id: string, data:any) {
    return this.http.put(this.url + "/" + id, data,{headers: this.headers})
  }

  updateStatus(id: string, data:any) {
    return this.http.put(this.url + "/actualizar-estado/" + id, data,{headers: this.headers})
  }

  delete(id:any) {
    return this.http.delete(this.url + "/" + id, {headers: this.headers})
  }

  /* ROLES */
  obtenerRoles() {
    return this.http.get(this.urlRoles, {headers: this.headers})
  }

  guardarRoles(data: any) {
    return this.http.post(this.urlRoles, data, {headers: this.headers})
  }
}
