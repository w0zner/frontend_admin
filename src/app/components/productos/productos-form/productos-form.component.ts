import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  productoForm: FormGroup
  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg'
  file: File | undefined = undefined
  productId: string = ''
  url: string;
  content = ''
  quillEditor: any;

  constructor(private fb: FormBuilder, private productoService: ProductoService, private notificacionService: NotificacionService, private router: Router, private activatedRoute: ActivatedRoute){
    this.url = GLOBAL.url + 'productos/obtenerPortada/'
    this.productoForm = this.fb.group({
      titulo: ['', [Validators.required]],
      portada: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required]],
      contenido: [''],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.productId = params.get('id') || ''
        console.log(this.productId)
        this.productoService.obtenerPorId(this.productId).subscribe({
          next: (response: any) => {
             this.productoForm.patchValue({
              titulo: response.data.titulo,
              portada: response.data.portada,
              precio: response.data.precio,
              descripcion: response.data.descripcion,
              stock: response.data.stock,
              categoria: response.data.categoria
            })

            if (this.quillEditor) {
              this.quillEditor.clipboard.dangerouslyPasteHTML(response.data.contenido);
            } else {
              setTimeout(() => {
                this.quillEditor.clipboard.dangerouslyPasteHTML(response.data.contenido);
              }, 300);
            }

            this.imgSelect = this.url + this.productoForm.controls['portada'].value
          }
        })
      }
    })
  }

  onEditorCreated(editor: any) {
    this.quillEditor = editor;
    if (this.productId && this.productoForm.value.contenido) {
      editor.clipboard.dangerouslyPasteHTML(this.productoForm.value.contenido);
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

  guardar() {
    if(this.productId != null) {
      console.log('uodate')
      console.log(this.productoForm.value)  
      console.log(this.productoForm )
      if(this.productoForm.valid) {
        this.productoForm.controls['contenido'].setValue(this.quillEditor.root.innerHTML)
        this.productoService.update(this.productoForm.value, this.file, this.productId).subscribe({
          next: (response:any) => {
            this.notificacionService.notificarExito("Producto actualizado con exito!")
            this.router.navigateByUrl('/panel/productos')
          },
          error: (err)=> {
            this.notificacionService.notificarError(null, "Error al guardar el producto")
          }
        })
      }
    } else {
      if(this.productoForm.valid && this.file) {
        console.log('Guardando producto...')
        console.log(this.productoForm.value)
        this.productoService.guardar(this.productoForm.value, this.file).subscribe({
          next: () => {
            this.notificacionService.notificarExito("Producto guardado con exito!")
            this.router.navigateByUrl('/panel/productos')
          },
          error: (err)=> {
            this.notificacionService.notificarError(null, "Error al guardar el producto")
          }
        })
      } else if(this.productoForm.valid && !this.file){
        this.notificacionService.notificarError(null, "Debe adjuntar una imagen")
      } else if(!this.productoForm.valid){
        this.notificacionService.notificarError(null, "Hay campos incorrectos, verifique el formulario")
      }
    }
  }
}
