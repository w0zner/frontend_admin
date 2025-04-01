import { Injectable } from '@angular/core';
declare const iziToast: any ;

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor() { }

  notificarExito(mensaje: string) {
    iziToast.show({
      title: 'Exito',
      message: mensaje,
      color: 'green',
      position: 'topRight'
    })
  }

  notificarError(err?: any, mensaje?:string){
    console.log('err ' + err)
    console.log('mensaje' + mensaje)
    if(err && !mensaje) {
      if(err.status==0) {
        console.log('a')
        iziToast.show({
          title: 'Error',
          message: 'No hay respuesta del servidor',
          color: 'red',
          position: 'topRight'
        })
      } else {
        console.log('b')
        console.log(err)
        iziToast.show({
          title: 'Error',
          message: err.error.message,
          color: 'red',
          position: 'topRight'
        })
      }
    } else if (mensaje) {
      console.log('c')
      console.log(err)
      iziToast.show({
        title: 'Error',
        message: mensaje,
        color: 'red',
        position: 'topRight'
      })
    }
  }

}
