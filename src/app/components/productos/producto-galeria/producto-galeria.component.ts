import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-producto-galeria',
  templateUrl: './producto-galeria.component.html',
  styleUrls: ['./producto-galeria.component.css']
})
export class ProductoGaleriaComponent implements OnInit {

  producto: any
  imgSelect: any | ArrayBuffer = null//'assets/img/01.jpg'
  url: string | undefined;
  file: File | undefined = undefined
  galeria: any

  constructor(private notificacionService: NotificacionService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ){
    this.url = GLOBAL.url + 'productos/obtenerPortada/'

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')){
        const id=params.get('id')
        this.obtenerProducto(id)
      }
    })
  }

  obtenerProducto(id:any){
    this.productoService.obtenerPorId(id).subscribe({
      next:(response:any) => {
        this.producto=response.data
        this.galeria=response.data.galeria
      },
      error:(err)=> {
        console.error(err)
      }
    })
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

  actualizar(){
    const id=uuidv4()
    this.productoService.subirImagenGaleria(id, this.file!, this.producto._id).subscribe({
      next: (response:any) => {
        this.notificacionService.notificarExito("Producto actualizado con exito!")
        this.obtenerProducto(this.producto._id)
        this.imgSelect=null
        this.file = undefined
      },
      error: (err) => {
        this.notificacionService.notificarError(null, "Error al guardar la variedad del producto")
        console.error(err)
      }
    })
  }

}
