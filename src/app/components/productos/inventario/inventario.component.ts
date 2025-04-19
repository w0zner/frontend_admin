import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  id: string | undefined
  producto: any
  inventario: any[] = []
  page=1
  pageSize=1  

  constructor(private productoService: ProductoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.id = params.get('id') || ''
        console.log(this.id)
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
    })
  }

}
