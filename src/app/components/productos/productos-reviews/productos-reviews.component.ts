import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-reviews',
  templateUrl: './productos-reviews.component.html',
  styleUrls: ['./productos-reviews.component.css']
})
export class ProductosReviewsComponent implements OnInit {

  producto: any
  url: string=""
  reviews: any[] = []

  constructor(private activatedRoute: ActivatedRoute, private productoService: ProductoService,) {
    this.url = GLOBAL.url + 'productos/obtenerPortada/'
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('id'))
      const id = params.get('id');
      this.obtenerProducto(id);
    })
  }

  obtenerProducto(id: any) {
    this.productoService.obtenerPorId(id).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.producto=response.data
        this.productoService.obtenerResenhasPorProducto(this.producto._id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.reviews = response.data;
          }
        })
      },
      error:(err)=> {
        console.error(err)
      }
    })
  }

}
