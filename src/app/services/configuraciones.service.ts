import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionesService {

  private url: string;
  private headers: any

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = GLOBAL.url + 'config'
    this.headers = this.authService.getHeaders()
  }

  obtenerConfiguracion() {
    return this.http.get(this.url, {headers: this.headers})
  }

  inicializar() {
    return this.http.post(this.url, {}, {headers: this.headers})
  }

  actualizar(data: any, image: File | undefined, id: string){
    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });
    console.log('data')

    let fd = new FormData()
    fd.append('titulo', data.titulo)
    fd.append('stock', data.stock)
    fd.append('precio', data.precio)
    fd.append('descripcion', data.descripcion)
    fd.append('contenido', data.contenido)
    fd.append('categoria', data.categoria)
    if(image) {
      fd.append('portada', image)
    }
    console.log(fd)
    return this.http.put(this.url + '/' + id , fd, {headers: headers})
  }

}
