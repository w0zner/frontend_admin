import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string;
  private headers: any

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = GLOBAL.url + 'productos'
    this.headers = this.authService.getHeaders()
  }

  listar(filtro?: any) {
    console.log(filtro)
    let getUrl = ''
    if(filtro) {
      getUrl = this.url + '/' + filtro
    } else {
      getUrl = this.url
    }
    return this.http.get(getUrl, {headers: this.headers})
  }

  guardar(data: any, image: File) {
    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });

    let fd = new FormData()
    fd.append('titulo', data.titulo)
    fd.append('stock', data.stock)
    fd.append('precio', data.precio)
    fd.append('descripcion', data.descripcion)
    fd.append('contenido', data.contenido)
    fd.append('categoria', data.categoria)
    fd.append('portada', image)
console.log(fd)
    return this.http.post(this.url, fd, {headers: headers})
  }

  obtenerPorId(id: any) {
    const obs = this.http.get(this.url + '/obtenerPorId/' + id, {headers: this.headers})
    console.log(obs)
    return obs
  }
}
