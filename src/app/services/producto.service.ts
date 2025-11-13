import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string;
  private urlReview: string;
  private headers: any

  constructor(private http: HttpClient, private authService: AuthService) {
    this.url = GLOBAL.url + 'productos'
    this.urlReview = GLOBAL.url + 'review'
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

  update(data: any, image: File | undefined, id: string){
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

  eliminar(id: string) {
    return this.http.delete(this.url + '/' + id, {headers: this.headers})
  }

  getInventario(id: string) {
    return this.http.get(this.url + '/inventario/' + id, {headers: this.headers})
  }

  eliminarItemInventario(id: string) {
    return this.http.delete(this.url + '/inventario/' + id, {headers: this.headers})
  }

  agregarItemInventario(data:any){
    return this.http.post(this.url + '/inventario/', data, {headers: this.headers})
  }

  actualizarVariedades(id:any, data: any) {
    return this.http.put(this.url + '/variedades/' + id, data, {headers: this.headers})
  }

  subirImagenGaleria(_id: any, image: File, id: string) {
    const headers = new HttpHeaders({
      Authorization: this.authService.getToken()
    });

    let fd = new FormData()
    fd.append('_id', _id)
    fd.append('imagen', image)
    console.log(fd)
    return this.http.put(this.url + '/subirImagenGaleria/' + id, fd, {headers: headers})
  }

  obtenerResenhasPorProducto(producto:any) {
    return this.http.get(this.urlReview + "/obtener-resenhas/" + producto,  {headers: this.headers})
  }
}
