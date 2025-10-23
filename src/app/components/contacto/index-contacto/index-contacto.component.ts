import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {

  mensajes: Array<any> = []
  page=1
  pageSize=3

  constructor(private configuracionesService: ConfiguracionesService, private notificaiconesService: NotificacionService) {

  }

  ngOnInit(): void {
    this.obtenerMensajes()
  }

  obtenerMensajes() {
    this.configuracionesService.obtenerMensajesContactos().subscribe({
      next: (response: any) => {
        console.log(response.data)
        this.mensajes = response.data;
      }
    })
  }

  resolverMensaje(id:string) {
    this.notificaiconesService.alertConfirmation(
      () => {
        this.configuracionesService.resolverMensaje(id).subscribe({
          next: () => this.obtenerMensajes()
        });
      },
      'Esta seguro que quiere cerrar este mensaje?',
      'Mensaje de contacto cerrado con exito!',
      'Error al resolver mensaje'
    )
  }

}
