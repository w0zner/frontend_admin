import { Component } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent {

  cupones: Array<any> = []
  page=1
  pageSize=5

  constructor(private rolesService: RolesService, private notificacionService: NotificacionService){
    
  }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.rolesService.listar().subscribe({
      next: (response: any) => {
        console.log(response)
        this.cupones = response.data
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

/*   eliminar(id:any){
    this.notificacionService.alertConfirmation(
      ()=> {
        this.cuponService.eliminar(id).subscribe({
          next: () => this.listar()
        })
      },
      null,
      'Cupón eliminado correctamente',
      'Error al eliminar el cupón')
      
  } */
}
