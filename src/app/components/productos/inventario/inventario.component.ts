import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  inventarioForm: FormGroup
  id: string | undefined
  producto: any
  inventario: any[] = []
  page=1
  pageSize=5  

  constructor(private fb: FormBuilder, private productoService: ProductoService, private activatedRoute: ActivatedRoute, private notificacionService: NotificacionService, private router: Router) { 
    this.inventarioForm = this.fb.group({
      producto: [''],
      proveedor: [''],
      cantidad: [''],
      usuario: [''],
      motivo: ['AJUSTE'],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.id = params.get('id') || ''
        console.log(this.id)
        this.listar()
      }
    })
  }

  listar() {
    this.productoService.obtenerPorId(this.id).subscribe({
      next: (response: any) => {
        if(response.data == undefined){
           this.producto = undefined
        } else {
          this.producto = response.data
          console.log(this.producto)
          this.productoService.getInventario(this.id!).subscribe({
            next: (response: any) => {
              this.inventario = response.data
              console.log(this.inventario)
            }
          })
        }
      }
    })
  }

  eliminar(id: any) {
    this.notificacionService.alertConfirmation(
      () => {
        this.productoService.eliminarItemInventario(id).subscribe({
          next: () => this.listar()
        });
      },
      null,
      'Cliente eliminado correctamente',
      'Error al eliminar el cliente'
    );
  }

  agregarInventario() {
    this.inventarioForm.patchValue({
      producto: this.producto._id,
      usuario: localStorage.getItem('_id')
    })

    this.productoService.agregarItemInventario(this.inventarioForm.value).subscribe({
      next: (response:any) => {
        this.notificacionService.notificarExito("Producto actualizado con exito!")
        this.listar()
        //this.router.navigateByUrl('/panel/productos/inventario/' + this.producto._id)
      },
      error: (err) => {
        this.notificacionService.notificarError(null, "Error al guardar el inventario producto")
      }
    })
  }

}
