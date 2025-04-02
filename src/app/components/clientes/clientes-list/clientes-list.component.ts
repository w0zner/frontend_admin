import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare const iziToast: any ;

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  usuarios: Array<any> = []
  filtroUsuarioForm: FormGroup
  page=1
  pageSize=1

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService, private router: Router) {
    this.filtroUsuarioForm= fb.group({
      nombre:[''],
      apellido:['']
    })
  }

  ngOnInit(): void {
    this.usuarioService.listar(null, null).subscribe({
      next:(response: any)=> {
        this.usuarios = response.data
        console.log(this.usuarios)
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
        console.log(this.usuarios)
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  eliminar(id:any){
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'Hey',
      message: 'Estás seguro de eliminar el registro?',
      position: 'center',
      buttons: [
          ['<button><b>YES</b></button>',  (instance: { hide: (arg0: { transitionOut: string; }, arg1: any, arg2: string) => void; }, toast: any) => {
              this.usuarioService.delete(id).subscribe({
                next: (resp:any) => {
                  console.log("eliminado")

                },
                error: (err) => {
                  console.error(err)
                },
                complete: ()=>{
                  this.router.navigateByUrl('/panel/clientes')
                }
              })
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

          }, true],
          ['<button>NO</button>', function (instance: { hide: (arg0: { transitionOut: string; }, arg1: any, arg2: string) => void; }, toast: any) {
            console.log('NO')
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

          }],
      ],
      onClosing: function(instance: any, toast: any, closedBy: string){
          console.info('Closing | closedBy: ' + instance + toast + closedBy);
      },
      onClosed: function(instance: any, toast: any, closedBy: string){
          console.info('Closed | closedBy: ' + closedBy);
      }
  });
  }

}
