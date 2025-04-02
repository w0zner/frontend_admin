import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-cupon-list',
  templateUrl: './cupon-list.component.html',
  styleUrls: ['./cupon-list.component.css']
})
export class CuponListComponent implements OnInit {

  //filtroUsuarioForm: FormGroup
  cupones: Array<any> = []
  page=1
  pageSize=1

  constructor(private cuponService: CuponService, private notificacionService: NotificacionService){
    
  }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.cuponService.listar().subscribe({
      next: (response: any) => {
        this.cupones = response.data
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  eliminar(id:any){
    this.notificacionService.alertConfirmation(
      ()=> {
        this.cuponService.eliminar(id).subscribe({
          next: () => this.listar()
        })
      }),
      null,
      'Cupón eliminado correctamente',
      'Error al eliminar el cupón'
  }

}
