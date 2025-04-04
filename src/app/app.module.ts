import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";

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
    ProductosFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
