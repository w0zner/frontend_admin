import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css']
})
export class IndexDescuentoComponent implements OnInit {

  descuentos: Array<any> = []
  page=1
  pageSize=1

  constructor() {

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
