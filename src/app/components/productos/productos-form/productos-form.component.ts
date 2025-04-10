import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  file: File | null = null
  config: any = {}
  public content: string = ""

  constructor(private fb: FormBuilder, private productoService: ProductoService, private notificacionService: NotificacionService){
    this.productoForm = this.fb.group({
      titulo: ['', [Validators.required]],
      //portada: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required]],
      contenido: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', [Validators.required]],
    })

    this.config = {
      apiKey: '9i1wvig782ii9ld0e4g5q60ry3dzmb1vipvv2efpor7vheoc', // Add your TinyMCE API key
      height: 300,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
    }
    this.content = '<p>Hola, TinyMCE!</p>';
  }

  ngOnInit(): void {
    
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
        this.file = null
      }
    } else {
      this.notificacionService.notificarError(null, "La imagen no puede ser mayor a 4MB")
      this.imgSelect= 'assets/img/01.jpg'
      this.file = null
    }
  }

  guardar() {
    if(this.productoForm.valid && this.file) {
      console.log('Guardando producto...')
      console.log(this.productoForm.value)
      this.productoService.guardar(this.productoForm.value, this.file).subscribe({
        next: () => {
          this.notificacionService.notificarExito("Producto guardado con exito!")
        },
        error: (err)=> {
          this.notificacionService.notificarError(null, "Error al guardar el producto")
        }
      })
    } else if(this.productoForm.valid && !this.file){
      this.notificacionService.notificarError(null, "Debe adjuntar una imagen")
    }
  }
}
