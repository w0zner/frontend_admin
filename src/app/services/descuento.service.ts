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

  obtenerPorId(id:any){
    return this.http.get(this.url + "/obtener/" + id, {headers: this.headers})
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
    fd.append('descuento', data.descuento)
    fd.append('fecha_inicio', data.fecha_inicio)
    fd.append('fecha_fin', data.fecha_fin)
    fd.append('banner', image)
    
    return this.http.post(this.url + '/registrar', fd, {headers: headers})
  }

  update(data: any, image: File | undefined, id: string){
    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });
    console.log('data')

    let fd = new FormData()
    fd.append('titulo', data.titulo)
    fd.append('descuento', data.descuento)
    fd.append('fecha_inicio', data.fecha_inicio)
    fd.append('fecha_fin', data.fecha_fin)
    if(image) {
      fd.append('banner', image)
    }
    console.log(fd)
    return this.http.put(this.url + '/actualizar/' + id , fd, {headers: headers})
  }

  eliminar(id: any) {
    return this.http.delete(this.url + "/" + id, {headers: this.headers})
  }


}
