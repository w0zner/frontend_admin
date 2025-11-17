import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {

  desde: any
  hasta: any

  constructor(private ventaService: VentaService) {

  }

  ngOnInit(): void {
   
  }

  consultarVentas(){
     this.ventaService.obtenerVentas(this.desde, this.hasta).subscribe({
      next: (response:any) => {
        console.log(response.data)
      }
    })
  }

}
