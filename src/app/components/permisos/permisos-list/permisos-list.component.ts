import { Component } from '@angular/core';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-permisos-list',
  templateUrl: './permisos-list.component.html',
  styleUrls: ['./permisos-list.component.css']
})
export class PermisosListComponent {

  permisos: Array<any> = []
  page=1
  pageSize=5

  constructor(private permisosService: PermisosService, private notificacionesService: NotificacionService) {

  }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.permisosService.listar().subscribe({
      next: (response: any) => {
        console.log(response)
        this.permisos = response.data
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  eliminar(id:any){
    this.notificacionesService.alertConfirmation(
      ()=> {
        this.permisosService.eliminar(id).subscribe({
          next: () => this.listar()
        })
      },
      null,
      'Cupón eliminado correctamente',
      'Error al eliminar el cupón')
      
  }
}
