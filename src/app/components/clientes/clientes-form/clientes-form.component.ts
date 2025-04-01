import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: any = null

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificacionService: NotificacionService
  ){
    this.clientesForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fecha_nacimiento: [''],
      cedula: ['', [Validators.required]],
      genero: ['seleccionar']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.id = params.get('id') || ""
        this.usuarioService.getById(this.id).subscribe({
          next: (response:any) => {
            this.clientesForm.patchValue({
              nombres: response.data.nombres,
              apellidos: response.data.apellidos,
              email: response.data.email,
              telefono: response.data?.telefono,
              fecha_nacimiento: response.data?.fecha_nacimiento,
              cedula: response.data.cedula,
              genero: response.data?.genero
            })
          },
          error: (err) => {
            console.error(err)
          }
        })
      }
    })
  }

  registrar() {
    if(this.id != null) {
      if(this.clientesForm.valid) {
        this.usuarioService.update(this.id, this.clientesForm.value).subscribe({
          next: (response)=>{
            this.notificacionService.notificarExito('Cliente actualizado exitosamente!')
            this.router.navigateByUrl('/panel/clientes')
          },
          error: (err)=> {
            this.notificacionService.notificarError(err)
          }
        })
      }
    } else {
      if(this.clientesForm.valid) {
        this.usuarioService.registrar(this.clientesForm.value).subscribe({
          next: (response)=>{
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

}
