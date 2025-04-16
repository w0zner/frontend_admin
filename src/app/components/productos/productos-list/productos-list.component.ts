import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {

  productos:  Array<any>= []
  filtroForm: FormGroup
  page=1
  pageSize=1
  url: string;

  constructor(private fb: FormBuilder, private productoService: ProductoService, private notificaccionService: NotificacionService){
    this.url = GLOBAL.url + 'productos/obtenerPortada/'
    this.filtroForm = this.fb.group({
      titulo: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.listar()
  }

  listar(nombre?: any) {
    this.productoService.listar(nombre).subscribe({
      next: (response: any) => {
        console.log(response.data)
        this.productos= response.data
      }
    })
  }

  filtrar() {
    if(this.filtroForm.valid) {
      console.log(2)
      this.listar(this.filtroForm.controls['titulo'].value)
    } 
  }

  limpiar() {
    this.filtroForm.reset()
    this.listar()
  }

  eliminar(id:any){
    this.notificaccionService.alertConfirmation(
      () => {
        this.productoService.eliminar(id).subscribe({
          next: () => this.listar()
        });
      },
      null,
      'Cliente eliminado correctamente',
      'Error al eliminar el cliente'
    );
  }

}
