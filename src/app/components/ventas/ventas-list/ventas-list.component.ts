import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {

  page=1
  pageSize=5
  desde: any
  hasta: any
  ventas: any[]=[];

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.consultarVentas();
  }

  consultarVentas(){
     this.ventaService.obtenerVentas(this.desde, this.hasta).subscribe({
      next: (response:any) => {
        console.log(response.data)
        this.ventas = response.data;
      }
    })
  }

  limpiar() {
    this.desde = undefined
    this.hasta = undefined
    this.consultarVentas();
  }

}
