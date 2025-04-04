import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg'
  file: File | null = null

  constructor(private notificacionService: NotificacionService){

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
    }
  }

}
