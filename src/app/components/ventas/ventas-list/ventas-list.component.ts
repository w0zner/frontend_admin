import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { VentaService } from 'src/app/services/venta.service';
//import { Modal } from 'bootstrap';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css']
})
export class VentasListComponent implements OnInit  {

  page=1
  pageSize=4
  desde: any
  hasta: any
  ventas: any[]=[];
  ventaToUpdate = { id:null, estado:null}
  ventaId=null
  estadoSeleccionado:any;
  estadoSeleccionadoTarget:string|undefined;
  seleccionado:any;
  hasActualizarEstado=false;
  tipoConsulta='fechas'
  estadoBuscar='Aceptado'
  nroVenta=undefined


  estadosVenta = [
    { id: 1, value: 'Aceptado', label: 'Aceptado', badge:"badge-primary"},
    { id: 2, value: 'Procesando', label: 'Procesando', badge:"badge-info" },
    { id: 3, value: 'En espera', label: 'En espera', badge:"badge-warning" },
    { id: 4, value: 'Preparado', label: 'Preparado', badge:"badge-light" },
    { id: 5, value: 'Enviado', label: 'Enviado', badge:"badge-primary" },
    { id: 6, value: 'Entregado', label: 'Entregado', badge:"badge-success" },
    { id: 7, value: 'Pagado', label: 'Pagado', badge:"badge-success" },
    { id: 8, value: 'Completado', label: 'Completado', badge:"badge-success" },
    { id: 9, value: 'Cancelado', label: 'Cancelado', badge:"badge-danger" },
    { id: 10, value: 'Devuelto', label: 'Devuelto', badge:"badge-secondary" },
    { id: 11, value: 'Reembolso', label: 'Reembolso', badge:"badge-secondary" },
  ];

  constructor(private ventaService: VentaService, private notificacionesService: NotificacionService) {}

  ngOnInit(): void {
    this.consultarVentas();
  }

  consultarVentas(){
    if(this.tipoConsulta==='fechas'){
        this.ventaService.obtenerVentas(this.desde, this.hasta).subscribe({
          next: (response:any) => {
            this.ventas = response.data;
            this.ventas = this.ventas.map(elm => {
              const estado = this.estadosVenta.find(e => e.value === elm.estado)

              return {
                ...elm,
                badge: estado ? estado.badge : ''
              }
            })
          }
        })
    } else if(this.tipoConsulta === 'venta') {
        this.ventaService.obtenerVentaPorNroVenta(this.nroVenta).subscribe({
          next: (response:any) => {
            this.ventas = response.data;
            this.ventas = this.ventas.map(elm => {
              const estado = this.estadosVenta.find(e => e.value === elm.estado)

              return {
                ...elm,
                badge: estado ? estado.badge : ''
              }
            })
          }
        })
    } else if(this.tipoConsulta === 'estado') {
        this.ventaService.obtenerVentaPorEstado(this.estadoBuscar).subscribe({
          next: (response:any) => {
            this.ventas = response.data;
            this.ventas = this.ventas.map(elm => {
              const estado = this.estadosVenta.find(e => e.value === elm.estado)

              return {
                ...elm,
                badge: estado ? estado.badge : ''
              }
            })
          }
        })
    }
  }

  limpiar() {
    this.desde = undefined
    this.hasta = undefined
    this.nroVenta = undefined
    this.estadoBuscar = 'Aceptado'
    this.consultarVentas();
  }

  obtenerVentaEstado(item: any) {
    this.estadoSeleccionado = this.estadosVenta.find(e => e.label === item.estado)
    this.estadoSeleccionadoTarget=this.estadosVenta.find(e => e.label === item.estado)!.value//.toString();
    this.ventaId = item._id
  }

  actualizarEstado(){
    this.ventaService.actualizarEstado(this.ventaId, this.seleccionado).subscribe({
      next: (response: any) => {
        this.notificacionesService.notificarExito("Orden actualizada con éxito!.")
        this.consultarVentas();
      }
    })
  }

  onDepartamentoChange(selected:any) {
    this.seleccionado = this.estadosVenta.find(elm => elm.value === selected.target.value)
    if(this.seleccionado?.id! < this.estadoSeleccionado.id) {
      this.notificacionesService.notificarAlerta("Estado seleccionado inválido.")
      this.estadoSeleccionadoTarget= this.estadoSeleccionado.value;
    } else {
      this.hasActualizarEstado = true;
    }
  }

  elegirTipoConsulta(tipo: any) {
    this.tipoConsulta = tipo;
  }

  onEstadosBuscarChange(e:any) {
    this.estadoBuscar = e.target.value
  }
}
