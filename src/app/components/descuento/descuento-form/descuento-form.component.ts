import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-descuento-form',
  templateUrl: './descuento-form.component.html',
  styleUrls: ['./descuento-form.component.css']
})
export class DescuentoFormComponent implements OnInit{

  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg'
  file: File | undefined = undefined
  descuentoId: string | null = null
  descuentoForm: FormGroup
  id:any= null

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private notificacionService: NotificacionService) {
    this.descuentoForm = this.fb.group({
      titulo: ['', Validators.required],
      descuento: [0, Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      banner: ['']
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'))
      this.id = params.get('id')
    })
  }

  registrar() {
    console.log('sfl')
    if(this.descuentoForm.valid && this.file) {
      console.log(this.descuentoForm.value)
      console.log(this.file)
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
