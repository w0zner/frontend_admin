import { Component, OnInit } from '@angular/core';
import  Chart  from 'chart.js/auto';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  total=0;
  cantidad=0;

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.obtenerKpiGanancias().subscribe({
      next: (resp:any) => {
        this.total = resp.enero + resp.febrero + resp.marzo + resp.abril + resp.mayo + resp.junio + resp.julio + resp.agosto + resp.septiembre + resp.octubre + resp.noviembre + resp.diciembre;

        const ctx = document.getElementById('myChartGanacias') as HTMLCanvasElement;
        if(ctx) {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Subtotal en meses',
                data: [resp.enero, resp.febrero, resp.marzo, resp.abril, resp.mayo, resp.junio, resp.julio, resp.agosto, resp.septiembre, resp.octubre, resp.noviembre, resp.diciembre],
                borderWidth: 1,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ]
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
      },
      error: (err:any) => {
        console.error(err)
      }
    })

    this.ventaService.obtenerKpiCantidad().subscribe({
      next: (resp:any) => {
        console.error(resp)
        this.cantidad = resp.enero + resp.febrero + resp.marzo + resp.abril + resp.mayo + resp.junio + resp.julio + resp.agosto + resp.septiembre + resp.octubre + resp.noviembre + resp.diciembre;

        const ctx = document.getElementById('myChartCantidades') as HTMLCanvasElement;
        if(ctx) {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
              datasets: [{
                label: 'Cantidad en meses',
                data: [resp.enero, resp.febrero, resp.marzo, resp.abril, resp.mayo, resp.junio, resp.julio, resp.agosto, resp.septiembre, resp.octubre, resp.noviembre, resp.diciembre],
                borderWidth: 1,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ]
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
      },
      error: (err:any) => {
        console.error(err)
      }
    })



  }

}
