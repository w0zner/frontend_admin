import { Component, OnInit } from '@angular/core';
import { DescuentoService } from 'src/app/services/descuento.service';

@Component({
  selector: 'app-descuento-list',
  templateUrl: './descuento-list.component.html',
  styleUrls: ['./descuento-list.component.css']
})
export class DescuentoListComponent implements OnInit {

  descuentos: Array<any> = []
  page=1
  pageSize=1

  constructor(private descuentoService: DescuentoService) {

  }

  ngOnInit(): void {
    this.descuentoService.listar().subscribe({
      next: (response: any) => {
        console.log(response)
        this.descuentos = response.data
      }
    })
  }

   eliminar(id:any){
   /*  this.notificacionService.alertConfirmation(
      ()=> {
        this.cuponService.eliminar(id).subscribe({
          next: () => this.listar()
        })
      }, 
      null,
      'Cupón eliminado correctamente',
      'Error al eliminar el cupón') */
  }
}
