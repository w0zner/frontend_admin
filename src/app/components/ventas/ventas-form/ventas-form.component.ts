import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas-form',
  templateUrl: './ventas-form.component.html',
  styleUrls: ['./ventas-form.component.css']
})
export class VentasFormComponent implements OnInit {

  url: string;
  orden: any
  detalles: any[] = []

  constructor(private ventaService: VentaService, private activated: ActivatedRoute) {
    this.url = GLOBAL.url + "productos/obtenerPortada/";
  }

  ngOnInit(): void {
    this.activated.paramMap.subscribe(params => {
      const id = params.get('id')

      this.ventaService.obtenerVentaPorId(id).subscribe({
        next:(response: any) => {
          this.orden = response.venta
          this.detalles = response.detalles
        }
      })
    })
  }

}
