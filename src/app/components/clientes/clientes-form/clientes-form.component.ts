import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare const iziToast: any ;

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  clientesForm: FormGroup
  private token: any

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private authService: AuthService, private router: Router){
    this.token= this.authService.getToken()
    this.clientesForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fecha_nacimiento: [''],
      cedula: ['', [Validators.required]],
      genero: ['']
    })
  }

  ngOnInit(): void {
  }

  registrar() {
    console.log(this.clientesForm.value)
    if(this.clientesForm.valid) {
      this.usuarioService.registrar(this.clientesForm.value, this.token).subscribe({
        next: (response)=>{
          console.log(response)
          iziToast.show({
            title: 'Info',
            message: 'Cliente guardado exitosamente!',
            color: 'green',
            position: 'topRight'
          })
          this.router.navigateByUrl('/panel/clientes')
        },
        error: (err)=> {
          iziToast.show({
            title: 'Error',
            message: err.error.message,
            color: 'red',
            position: 'topRight'
          })
        }
      })
    }
  }

}
