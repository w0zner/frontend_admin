import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {

  productos:  Array<any>= []
  page=1
  pageSize=1

  constructor(private productoService: ProductoService){

  }

  ngOnInit(): void {
    this.listar()
  }

  listar() {
    this.productoService.listar().subscribe({
      next: (response: any) => {
        this.productos= response.data
      }
    })
  }

  eliminar(id:any){

  }

}
