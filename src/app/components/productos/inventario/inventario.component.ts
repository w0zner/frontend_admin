import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver'

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
  itemsExportacion: Array<any> = []
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
          
          this.productoService.getInventario(this.id!).subscribe({
            next: (response: any) => {
              this.inventario = response.data
              console.log(this.inventario)
              this.inventario.forEach(element=>{
                this.itemsExportacion.push({
                  producto: this.producto.titulo,
                  proveedor: element.proveedor,
                  cantidad: element.cantidad,
                  usuario: element.usuario.email,
                  motivo: element.motivo,
                })
              })
              
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

  downloadExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.itemsExportacion){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Proveedor', key: 'col2', width: 15},
      { header: 'Cantidad', key: 'col3', width: 5},
      { header: 'Usuario', key: 'col4', width: 25},
      { header: 'Motivo', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

}
