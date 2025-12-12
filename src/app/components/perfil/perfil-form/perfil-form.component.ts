import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit{
  perfilForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router, private notificacionService: NotificacionService) {
    this.perfilForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      fecha_nacimiento: [''],
      ciudad: [''],
      cedula: ['', [Validators.required]],
      genero: [''],
      extranjero: [false],
      ruc: [''],
      denominacion: [''],
      tipo_documento: ['']
    })
  }

  ngOnInit(): void {
    this.usuarioService.getById(localStorage.getItem('_id') || '').subscribe((res: any) => {
      this.perfilForm.patchValue(res.data)
    })
  }

  actualizarPerfil() {
    this.usuarioService.update(localStorage.getItem('_id') || '', this.perfilForm.value).subscribe((res: any) => {
      this.notificacionService.notificarExito('Tu perfil se actualizó correctamente.')
      this.router.navigate(['/inicio'])
    })
  }

}

