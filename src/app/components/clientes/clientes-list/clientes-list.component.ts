import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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
  pageSize=1

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService) {
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

}
