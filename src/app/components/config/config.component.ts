import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Categoria {
  titulo: any;
  icono: any;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  existeConfig = false
  categoriaForm: FormGroup
  categorias: Categoria[]= []

  constructor(private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      titulo: [''],
      icono: [''],
    })
  }

  ngOnInit(): void {

  }

  agregarCategorias(){
    console.log(this.categoriaForm.value)
    this.categorias.push({titulo: this.categoriaForm.controls['titulo'].value, icono: this.categoriaForm.controls['icono'].value})
  }

}
