import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientesFormComponent } from './components/clientes/clientes-form/clientes-form.component';
import { CuponListComponent } from './components/cupon/cupon-list/cupon-list.component';
import { CuponFormComponent } from './components/cupon/cupon-form/cupon-form.component';
import { ProductosFormComponent } from './components/productos/productos-form/productos-form.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { QuillModule } from 'ngx-quill';
import { InventarioComponent } from './components/productos/inventario/inventario.component';
import { ConfigComponent } from './components/config/config.component';
import { ProductoVariedadComponent } from './components/productos/producto-variedad/producto-variedad.component';
import { ProductoGaleriaComponent } from './components/productos/producto-galeria/producto-galeria.component';
import { IndexDescuentoComponent } from './components/descuento/index-descuento/index-descuento.component';
import { FormDescuentoComponent } from './components/descuento/form-descuento/form-descuento.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    ClientesListComponent,
    ClientesFormComponent,
    CuponListComponent,
    CuponFormComponent,
    ProductosFormComponent,
    ProductosListComponent,
    InventarioComponent,
    ConfigComponent,
    ProductoVariedadComponent,
    ProductoGaleriaComponent,
    IndexDescuentoComponent,
    FormDescuentoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
