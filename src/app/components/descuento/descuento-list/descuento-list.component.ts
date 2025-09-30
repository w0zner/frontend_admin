import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/services/descuento.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-descuento-list',
  templateUrl: './descuento-list.component.html',
  styleUrls: ['./descuento-list.component.css']
})
export class DescuentoListComponent implements OnInit {

  descuentos: Array<any> = []
  url: string
  page=1
  pageSize=5

  constructor(private descuentoService: DescuentoService, private notificacionService: NotificacionService) {
    this.url = GLOBAL.url + 'descuentos/obtenerPortada/'
  }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.descuentoService.listar().subscribe({
      next: (response: any) => {
        console.log(response)
        this.descuentos = response.data

        this.descuentos.forEach(descuento => {
          const desde= Date.parse(descuento.fecha_inicio+"T00:00:00")/1000;
          const hasta= Date.parse(descuento.fecha_fin+"T23:59:59")/1000;
          const hoy= Date.parse(new Date().toString())/1000;

          if(hoy<desde){
            descuento.estado = 'Proximamente'
          } else if(hoy>=desde && hoy<=hasta){
            descuento.estado = 'Vigente'
          } else if(hoy>hasta){
            descuento.estado = 'Finalizado'
          }

        });
      }
    })
  }

   eliminar(id:any){
   this.notificacionService.alertConfirmation(
      ()=> {
        this.descuentoService.eliminar(id).subscribe({
          next: () => this.listar()
        })
      },
      null,
      'Descuento eliminado correctamente',
      'Error al eliminar el descuento')
  }
}
