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
