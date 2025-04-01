import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  clientesForm: FormGroup

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService
  ){
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
    if(this.clientesForm.valid) {
      this.usuarioService.registrar(this.clientesForm.value).subscribe({
        next: (response)=>{
          console.log(response)
          this.notificacionService.notificarExito('Cliente guardado exitosamente!')
          this.router.navigateByUrl('/panel/clientes')
        },
        error: (err)=> {
          this.notificacionService.notificarError(err)
        }
      })
    }
  }

}
