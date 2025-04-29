import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ProductoService } from 'src/app/services/producto.service';

export interface Variedad {
  descripcion: any;
}

@Component({
  selector: 'app-producto-variedad',
  templateUrl: './producto-variedad.component.html',
  styleUrls: ['./producto-variedad.component.css']
})
export class ProductoVariedadComponent implements OnInit {

  variedadesForm: FormGroup
  variedades: Variedad[]= []
  producto: any
  url: string=""
  variedadesControl: any

  constructor(private fb: FormBuilder,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private notificacionService:NotificacionService){
      this.url = GLOBAL.url + 'productos/obtenerPortada/'
      this.variedadesForm = this.fb.group({
        titulo_variedad: ['', [Validators.required]],
        variedades: [[] as Variedad[]],
        descripcion: [''],
      })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=> {
      if(params.get('id')) {
        const id=params.get('id')
        console.log(id)
        this.obtenerProducto(id!)
      }
    })
  }

  obtenerProducto(id: string) {
    this.productoService.obtenerPorId(id).subscribe({
      next:(response:any)=>{
        console.log(response)
        this.producto=response.data

        this.variedadesForm.patchValue({
          titulo_variedad: response.data.titulo_variedad,
          variedades: response.data.variedades
        })

        this.variedadesForm.controls['titulo_variedad'].setValue(response.data.titulo_variedad)
        this.variedades = response.data.variedades
      },
      error:(err)=> {
        console.error(err)
      }
    })
  }

  agregarVariedad(){
    if(this.variedadesForm.controls['descripcion'].value !=="") {
      this.variedadesControl = this.variedadesForm.get('variedades');
      this.variedades = this.variedadesControl?.value || [];

      this.variedades.push({
        descripcion: this.variedadesForm.controls['descripcion'].value
      });
      this.variedadesForm.controls['descripcion'].setValue("")

      this.variedadesControl?.setValue(this.variedades);
    }  else {
      this.notificacionService.notificarAlerta("Debe agregar una variedad para guardar")
    }
  }

  eliminarVariedad(index: number) {
    const categoriasControl = this.variedadesForm.get('variedades');
    this.variedades = categoriasControl?.value || [];

    this.variedades.splice(index, 1);

    categoriasControl?.setValue(this.variedades);
  }

  actualizar() {
    const { titulo_variedad, variedades } = this.variedadesForm.value;
    const datosAEnviar = { titulo_variedad, variedades };

    this.productoService.actualizarVariedades(this.producto._id, datosAEnviar).subscribe({
      next: (response:any) => {
        this.notificacionService.notificarExito("Producto actualizado con exito!")
        this.route.navigateByUrl('/panel/productos')
      },
      error: (err)=> {
        this.notificacionService.notificarError(null, "Error al guardar la variedad del producto")
        console.error(err)
      }
    })

  }

}
