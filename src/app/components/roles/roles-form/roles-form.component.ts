import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CuponService } from 'src/app/services/cupon.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { PermisosService } from 'src/app/services/permisos.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {

  rolesForm: FormGroup
  permisos: any[] = []
  permisosSeleccionados: any[] = []
  id:any= null

  constructor(private fb:FormBuilder, private rolesService: RolesService, private permisosService: PermisosService, private notificacionService: NotificacionService, private route: ActivatedRoute, private router: Router) {
    this.rolesForm = this.fb.group({
      nombre: ['', [Validators.required]],
      permisos: [[], [Validators.required]],
      createdAt: [''],
    })
  }

  ngOnInit(): void {
    this.listarPermisos()
     this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.id = params.get('id')
        this.rolesService.obtenerPorId(this.id).subscribe({
          next: (response:any) => {
            console.log(response)
            this.rolesForm.patchValue({
              nombre: response.data.nombre,
              permisos:  response.data.permisos,
              createdAt: moment(response.data.createdAt).format('YYYY-MM-DD')
            })

            this.permisosSeleccionados = this.rolesForm.get('permisos')?.value
            console.log(this.permisosSeleccionados)
          }
        })
      }
    })
  }

  listarPermisos() {
    this.permisosService.listar().subscribe({
      next: (response: any) => {
        console.log(response)
        this.permisos = response.data
      }
    })
  }

  agregarPermiso(data: any) {
    if(!this.permisosSeleccionados.includes(data)){
      this.permisosSeleccionados.push(data)
    }
     console.log(this.permisosSeleccionados);
     this.rolesForm.patchValue({
      permisos: this.permisosSeleccionados
    })
  }

  sacarPermiso(data: any) {
     this.permisosSeleccionados = this.permisosSeleccionados.filter(item => item !== data)
     this.rolesForm.patchValue({
      permisos: this.permisosSeleccionados
    })
  }

  registrar() {
    
    console.log(this.rolesForm.value)
     if(this.rolesForm.valid){
      if(this.id != null) {
        this.rolesService.actualizar(this.id, this.rolesForm.value).subscribe({
          next: (resp: any) => {
            this.notificacionService.notificarExito('Rol actualizado exitosamente')
            this.router.navigateByUrl('/panel/roles')
          },
          error: err =>  this.notificacionService.notificarError(err)
        })
      } else {
        this.rolesService.guardar(this.rolesForm.value).subscribe({
          next: (resp: any)=> {
            this.notificacionService.notificarExito('Rol actualizado exitosamente')
            this.router.navigateByUrl('/panel/roles')
          },
          error: err =>  this.notificacionService.notificarError(err)
        })
      }
    } 
  }

}
