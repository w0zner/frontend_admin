import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DescuentoService } from 'src/app/services/descuento.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-descuento-form',
  templateUrl: './descuento-form.component.html',
  styleUrls: ['./descuento-form.component.css']
})
export class DescuentoFormComponent implements OnInit{

  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg'
  file: File | undefined = undefined
  url: string
  descuentoId: string | null = null
  descuentoForm: FormGroup
  id:any= null

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private notificacionService: NotificacionService, private descuentoService: DescuentoService, private router: Router) {
    this.url = GLOBAL.url + 'descuentos/obtenerPortada/'
    this.descuentoForm = this.fb.group({
      titulo: ['', Validators.required],
      descuento: [0, [Validators.required, Validators.pattern(/^([0-9]|[1-9][0-9])$/)]],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      banner: ['']
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'))
      this.id = params.get('id')

      if(params.get('id')) {
        this.descuentoId = params.get('id')
        this.descuentoService.obtenerPorId(this.descuentoId).subscribe({
          next: (response:any) => {
            console.log(response)
            this.descuentoForm.patchValue({
              titulo: response.data.titulo,
              descuento:  response.data.descuento,
              fecha_inicio: response.data.fecha_inicio,
              fecha_fin: response.data.fecha_fin,
              banner: response.data.banner
            })
          },
          complete: () => {
            this.imgSelect = this.url + this.descuentoForm.controls['banner'].value
          }
        })


      }
    })
  }

  registrar() {
    const desde= Date.parse(this.descuentoForm.get('fecha_inicio')?.value+"T00:00:00")/1000;
    const hasta= Date.parse(this.descuentoForm.get('fecha_fin')?.value+"T23:59:59")/1000;

    if(desde>hasta){
      this.notificacionService.notificarError(null, "La fecha de inicio no puede ser mayor a la fecha fin")
      return
    }

    if(this.descuentoId != null) {
      if(this.descuentoForm.valid) {
        this.descuentoService.update(this.descuentoForm.value, this.file, this.descuentoId).subscribe({
          next: (response:any) => {
            this.notificacionService.notificarExito("Registro actualizado con exito!")
            this.router.navigateByUrl('/panel/descuentos')
          },
          error: (err)=> {
            this.notificacionService.notificarError(null, "Error al actualizar el descuento")
          }
        })
      }
    } else {
      if(this.descuentoForm.valid && this.file) {
        console.log(this.descuentoForm.value)
        console.log(this.file)
        this.descuentoService.guardar(this.descuentoForm.value, this.file).subscribe({
          next: (response: any) => {
            this.notificacionService.notificarExito('Registro guardado con exito!')
            this.router.navigateByUrl('/panel/descuentos')
          },
          error: (err)=> {
            this.notificacionService.notificarError(null, "Error al guardar el descuento")
          }
        })
      } else if(this.descuentoForm.valid && !this.file){
        this.notificacionService.notificarAlerta("Debe adjuntar una imagen")
      } else if(!this.descuentoForm.valid){
        this.notificacionService.notificarError(null, "Hay campos incorrectos, verifique el formulario")
      }
    }

  }

    fileChangeEvent(event:any): void {
    let file;
    if(event.target.files && event.target.files[0]) {
      file = <File> event.target.files[0];
      console.log(file)
    } else {
      this.notificacionService.notificarError(null, "No hay archivo de imagen")
    }

    if(file && file.size <= 4000000) {
      if(file.type=='image/png' || file.type=='image/jpeg' || file.type=='image/jpg' || file.type=='image/gif') {
        const reader = new FileReader()
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect)

        reader.readAsDataURL(file)
        this.file = file
      } else {
        this.notificacionService.notificarError(null, "El archivo debe ser una imagen válida")
        this.imgSelect= 'assets/img/01.jpg'
        this.file = undefined
      }
    } else {
      this.notificacionService.notificarError(null, "La imagen no puede ser mayor a 4MB")
      this.imgSelect= 'assets/img/01.jpg'
      this.file = undefined
    }
  }
}
