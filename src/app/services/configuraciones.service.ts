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

  actualizar(data: any, image: File | undefined){
    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });
    console.log('data')

    let fd = new FormData()
    fd.append('categorias', JSON.stringify(data.categorias))
    fd.append('titulo', data.titulo)
    fd.append('establecimiento', data.establecimiento)
    fd.append('punto', data.punto)
    fd.append('correlativo', data.correlativo)
    if(image) {
      fd.append('logo', image)
    }
    console.log(fd)
    return this.http.put(this.url + '/', fd, {headers: headers})
  }

}
