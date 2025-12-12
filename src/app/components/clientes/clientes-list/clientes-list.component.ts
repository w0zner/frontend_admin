import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  usuarios: Array<any> = []
  filtroUsuarioForm: FormGroup
  page=1
  pageSize=5

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService, private router: Router, private notificacion:NotificacionService) {
    this.filtroUsuarioForm= fb.group({
      nombre:[''],
      apellido:['']
    })
  }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.usuarioService.listar(null, null).subscribe({
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
    }else if(tipo && tipo=='apellido'){
      filtro=this.filtroUsuarioForm.controls['apellido'].value
    }

    this.usuarioService.listar(tipo, filtro).subscribe({
      next:(response: any)=> {
        this.usuarios = response.data
      },
      error:(err)=>{
        console.error(err)
      }
    })
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
    this.usuarioService.updateStatus(item._id, {estado:!item.activo}).subscribe({
      next: (response: any) => {
        this.listar();
      }
    })
  }



}
