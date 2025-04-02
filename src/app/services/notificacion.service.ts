import { Injectable } from '@angular/core';
declare const iziToast: any ;

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor() { }

  notificarExito(mensaje: string, position?: string) {
    iziToast.success({
      title: 'Exito',
      message: mensaje,
      //color: 'green',
      position: position || 'topRight'
    })
  }

  notificarError(err?: any, mensaje?:string){
    if(err) {
      if(err.status==0) {
        iziToast.error({
          title: 'Error',
          message: 'No hay respuesta del servidor',
          //color: 'red',
          position: 'topRight'
        })
      } else {
        iziToast.error({
          title: 'Error',
          message: mensaje || err.error.message,
          //color: 'red',
          position: 'topRight'
        })
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: mensaje,
        //color: 'red',
        position: 'topRight'
      })
    }
  }

}
