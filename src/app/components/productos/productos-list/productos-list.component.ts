import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver'

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {

  productos:  Array<any>= []
  itemsExportacion: Array<any> = []
  filtroForm: FormGroup
  page=1
  pageSize=5
  url: string;
  loading=false

  constructor(private fb: FormBuilder, private productoService: ProductoService, private notificaccionService: NotificacionService){
    this.url = GLOBAL.url + 'productos/obtenerPortada/'
    this.filtroForm = this.fb.group({
      titulo: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.listar()
  }

  listar(nombre?: any) {
    this.loading=true
    this.productoService.listar(nombre).subscribe({
      next: (response: any) => {
        this.productos= response.data

        this.productos.forEach(element => {
          this.itemsExportacion.push({
            titulo: element.titulo,
            stock: element.stock,
            precio: element.precio,
            categoria: element.categoria,
            nventas: element.nventas
          })
        })

        this.loading=false
      },
      error:(err)=> {
        this.notificaccionService.notificarError(err)
      }
    })
  }

  filtrar() {
    if(this.filtroForm.valid) {
      this.listar(this.filtroForm.controls['titulo'].value)
    }
  }

  limpiar() {
    this.filtroForm.reset()
    this.listar()
  }

  eliminar(id:any){
    this.notificaccionService.alertConfirmation(
      () => {
        this.productoService.eliminar(id).subscribe({
          next: () => this.listar()
        });
      },
      null,
      'Cliente eliminado correctamente',
      'Error al eliminar el cliente'
    );
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
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

}
