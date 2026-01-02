import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { PermisosService } from 'src/app/services/permisos.service';

@Component({
  selector: 'app-permisos-form',
  templateUrl: './permisos-form.component.html',
  styleUrls: ['./permisos-form.component.css']
})
export class PermisosFormComponent implements OnInit {
  permisosForm: FormGroup
  id:any= null
  metodo: string = ''

  constructor(private fb:FormBuilder, private permisosService: PermisosService, private notificacionService: NotificacionService, private route: ActivatedRoute, private router: Router) {
    this.permisosForm = this.fb.group({
      key: ['', [Validators.required]],
      description: ['', [Validators.required]],
      metodo: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.id = params.get('id')
        this.permisosService.obtenerPorId(this.id).subscribe({
          next: (response:any) => {
            console.log(response)
            this.permisosForm.patchValue({
              key: response.data.key,
              description:  response.data.description,
              metodo: '',
              createdAt: moment(response.data.createdAt).format('YYYY-MM-DD')
            })
            const llave= this.permisosForm.get('key')?.value;
            const [raiz, met] = llave.split('.')
            this.permisosForm.get('key')?.setValue(raiz)
            this.permisosForm.get('metodo')?.setValue(met.toUpperCase())
          }
        })
      }
    }) 
  }

  cargarNombre() {
    const nombre = this.capitalize(this.permisosForm.get('key')?.value?.trim()) + ' ' +  this.permisosForm.get('metodo')?.value?.toUpperCase();
    this.permisosForm.patchValue({
        description: nombre
    })
  }

  capitalize(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }


  registrar() {
     if(this.permisosForm.valid){
      const llave = this.permisosForm.get('key')?.value?.trim() + '.' + this.permisosForm.get('metodo')?.value?.toLowerCase()
      this.permisosForm.patchValue({
        key: llave
      })

      if(this.id != null) {
        this.permisosService.actualizar(this.id, this.permisosForm.value).subscribe({
          next: (resp: any) => {
            this.notificacionService.notificarExito('Permiso actualizado exitosamente')
            this.router.navigateByUrl('/panel/permisos')
          },
          error: (err: any) =>  this.notificacionService.notificarError(err)
        })
      } else {
        this.permisosService.guardar(this.permisosForm.value).subscribe({
          next: (resp: any)=> {
            this.notificacionService.notificarExito('Permiso actualizado exitosamente')
            this.router.navigateByUrl('/panel/permisos')
          },
          error: (err: any) =>  this.notificacionService.notificarError(err)
        })
      }
    } 
  }
}
