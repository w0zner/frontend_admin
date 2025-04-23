import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

export interface Categoria {
  titulo: any;
  icono: any;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  loading=false
  existeConfig = false
  categoriaForm: FormGroup
  configForm: FormGroup
  categorias: Categoria[]= []
  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg'
  file: File | undefined = undefined

  constructor(private fb: FormBuilder, private notificacionService: NotificacionService, private configService: ConfiguracionesService) {
    this.categoriaForm = this.fb.group({
      titulo: ['', [Validators.required]],
      icono: ['', [Validators.required]],
    })

    this.configForm = this.fb.group({
      categorias: [''],
      titulo: ['', [Validators.required]],
      logo: [''],
      establecimiento: ['', [Validators.required]],
      punto: ['', [Validators.required]],
      correlativo: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.configService.obtenerConfiguracion().subscribe({
      next: (response:any) => {
        console.log(response.data)
        if(response.data) {
          this.existeConfig = true
        }
      }
    })
  }

  inicializar() {
    this.loading=true
    this.configService.inicializar().subscribe({
      next: (response:any)=> {
        setTimeout(() => {
          this.existeConfig = true
          this.loading = false
        }, 2000);
      }
    })
  }

  agregarCategorias(){
    if(this.categoriaForm.valid) {
      this.categorias.push({titulo: this.categoriaForm.controls['titulo'].value, icono: this.categoriaForm.controls['icono'].value})
    } else {
      this.notificacionService.notificarError(null, 'Los campos son requeridos para agregar una categoría')
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

  actualizar() {
    if(this.configForm.valid && this.file) {
      this.configForm.patchValue({
        categorias: this.categorias,
      })
      console.log(this.configForm.value)
      console.log(this.file)
    }
  }

}
