import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit {

  page=1
  pageSize=4
  desde: any
  hasta: any
  ventas: any[]=[];
  estadoSeleccionado:any;

  estadosVenta = [
    { id: 1, value: 'aceptado', label: 'Aceptado' },
    { id: 2, value: 'procesando', label: 'Procesando' },
    { id: 3, value: 'en_espera', label: 'En espera' },
    { id: 4, value: 'preparado', label: 'Preparado' },
    { id: 5, value: 'enviado', label: 'Enviado' },
    { id: 6, value: 'entregado', label: 'Entregado' },
    { id: 7, value: 'pagado', label: 'Pagado' },
    { id: 8, value: 'completado', label: 'Completado' },
    { id: 9, value: 'cancelado', label: 'Cancelado' },
    { id: 10, value: 'devuelto', label: 'Devuelto' },
    { id: 11, value: 'reembolso', label: 'Reembolso' },
  ];

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.consultarVentas();
  }

  consultarVentas(){
     this.ventaService.obtenerVentas(this.desde, this.hasta).subscribe({
      next: (response:any) => {
        console.log(response.data)
        this.ventas = response.data;
        
        console.log(this.estadoSeleccionado)
      }
    })
  }

  limpiar() {
    this.desde = undefined
    this.hasta = undefined
    this.consultarVentas();
  }

  obtenerVentaEstado(item: any) {
    this.estadoSeleccionado = this.estadosVenta.find(e => e.value === item.estado);
  }

}
