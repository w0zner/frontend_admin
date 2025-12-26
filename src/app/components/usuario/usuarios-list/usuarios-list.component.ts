import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent {

  usuarios: Array<any> = []
    filtroUsuarioForm: FormGroup
    page=1
    pageSize=5
    tipoFiltro: string = 'rol'

    constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService, private router: Router, private notificacion:NotificacionService) {
      this.filtroUsuarioForm= fb.group({
        nombre:[''],
        apellido:[''],
        email:[''],
        rol:[''],
        estado:['']
      })
    }

    ngOnInit(): void {
      this.listar()
    }

    listar() {
      this.usuarioService.listarUsuarioSistemaAdmin(null, null).subscribe({
        next:(response: any)=> {
          this.usuarios = response.data
        },
        error:(err)=>{
          console.error(err)
        }
      })
    }

    filtro(tipo: string){
      let filtro: any
      if(tipo && tipo=='nombre'){
        filtro=this.filtroUsuarioForm.controls['nombre'].value
      } else if(tipo && tipo=='apellido'){
        filtro=this.filtroUsuarioForm.controls['apellido'].value
      } else if(tipo && tipo=='email'){
        filtro=this.filtroUsuarioForm.controls['email'].value
      } else if(tipo && tipo=='rol'){
        filtro=this.filtroUsuarioForm.controls['rol'].value
      } else if(tipo && tipo=='estado'){
        filtro=this.filtroUsuarioForm.controls['estado'].value
      }

      this.usuarioService.listarUsuarioSistemaAdmin(tipo, filtro).subscribe({
        next:(response: any)=> {
          this.usuarios = response.data
        },
        error:(err)=>{
          console.error(err)
        }
      })
    }

    mostrarFiltro(tipo: string) {
      this.filtroUsuarioForm.reset()
      this.tipoFiltro = tipo
    }

    eliminar(id:any){
      this.notificacion.alertConfirmation(
        () => {
          this.usuarioService.delete(id).subscribe({
            next: () => this.listar()
          });
        },
        null,
        'Cliente eliminado correctamente',
        'Error al eliminar el cliente'
      );
    }

    actualizarEstado(item: any) {
      if(item.rol.nombre == 'ADMIN') {
        this.notificacion.notificarError(null, 'No se puede cambiar el estado de un administrador');
        return;
      }

      this.usuarioService.updateStatus(item._id, {estado:!item.activo}).subscribe({
        next: (response: any) => {
          this.listar();
        }
      })
    }
}
