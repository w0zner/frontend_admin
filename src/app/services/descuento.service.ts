import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  private url: string;
  private headers: any

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = GLOBAL.url + 'descuentos'
    this.headers = this.authService.getHeaders()
  }

  listar(filtro?: any) {
    console.log(filtro)
    let getUrl = ''
    if(filtro) {
      getUrl = this.url + '/listar/' + filtro
    } else {
      getUrl = this.url+ '/listar/'
    }
    return this.http.get(getUrl, {headers: this.headers})
  }

  guardar(data: any, image: File) {
    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });

    let fd = new FormData()
    fd.append('titulo', data.titulo)
    fd.append('descuento', data.stock)
    fd.append('fecha_inicio', data.precio)
    fd.append('fecha_fin', data.descripcion)
    fd.append('banner', image)
console.log(fd)
    return this.http.post(this.url + '/registrar', fd, {headers: headers})
  }
}
