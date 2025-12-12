import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
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
  url: string;
  categoriasControl : any

  constructor(private fb: FormBuilder, private notificacionService: NotificacionService, private configService: ConfiguracionesService) {
    this.url = GLOBAL.url + 'config/obtenerLogo/'
    this.categoriaForm = this.fb.group({
      titulo: ['', [Validators.required]],
      icono: ['', [Validators.required]],
    })

    this.configForm = this.fb.group({
      categorias: [[] as Categoria[]],
      titulo: ['', [Validators.required]],
      logo: [''],
      establecimiento: ['', [Validators.required]],
      punto: ['', [Validators.required]],
      correlativo: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.obtenerConfiguracion()
  }

  inicializar() {
    this.loading=true
    this.configService.inicializar().subscribe({
      next: (response:any)=> {
        setTimeout(() => {
          this.existeConfig = true
          this.obtenerConfiguracion()
          this.loading = false
        }, 2000);
      }
    })
  }

  obtenerConfiguracion() {
    this.configService.obtenerConfiguracion().subscribe({
      next: (response:any) => {

        if(response.data) {
          this.configForm.patchValue({
            categorias: response.data.categorias,
            titulo: response.data.titulo,
            logo: response.data.logo,
            establecimiento: response.data.establecimiento,
            punto: response.data.punto,
            correlativo: response.data.correlativo,
          })
          this.categorias=response.data.categorias
          this.imgSelect = this.url + response.data.logo
          this.existeConfig = true
        }
      }
    })
  }

  agregarCategorias(){
    if(this.categoriaForm.valid) {

      this.categoriasControl = this.configForm.get('categorias');
      const cat = this.categoriasControl?.value || [];
    
      cat.push({
        titulo: this.categoriaForm.controls['titulo'].value,
        icono: this.categoriaForm.controls['icono'].value,
      });
    
      this.categoriasControl?.setValue(cat);

      /* this.categorias.push({titulo: this.categoriaForm.controls['titulo'].value, icono: this.categoriaForm.controls['icono'].value})
      this.categoriaForm.patchValue({
        titulo: '',
        icono: ''
      }) */
    } else {
      this.notificacionService.notificarError(null, 'Los campos son requeridos para agregar una categoría')
    }
  }

  eliminarCategoria(index: number) {
    const categoriasControl = this.configForm.get('categorias');
    const categorias = categoriasControl?.value || [];
  
    // Eliminamos el item por índice
    categorias.splice(index, 1);
  
    // Actualizamos el form
    categoriasControl?.setValue(categorias);
  }

  fileChangeEvent(event:any): void {
    let file;
    if(event.target.files && event.target.files[0]) {
      file = <File> event.target.files[0];
    } else {
      this.notificacionService.notificarError(null, "No hay archivo de imagen")
    }

    if(file && file.size <= 4000000) {
      if(file.type=='image/png' || file.type=='image/jpeg' || file.type=='image/jpg' || file.type=='image/gif') {
        const reader = new FileReader()
        reader.onload = e => this.imgSelect = reader.result;

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
    if(this.configForm.valid) {
      this.configService.actualizar(this.configForm.value, this.file).subscribe({
        next: (response: any) => {
          this.obtenerConfiguracion()
          this.notificacionService.notificarExito('Configuración actualizada exitosamente!')
        },
        error: (err) => {
          this.notificacionService.notificarError(err, 'No se pudo actualizar la configuración')
        }
      })
    }
  }

}
