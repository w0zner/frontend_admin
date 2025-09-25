import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './components/clientes/clientes-form/clientes-form.component';
import { CuponListComponent } from './components/cupon/cupon-list/cupon-list.component';
import { CuponFormComponent } from './components/cupon/cupon-form/cupon-form.component';
import { ProductosFormComponent } from './components/productos/productos-form/productos-form.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { InventarioComponent } from './components/productos/inventario/inventario.component';
import { ConfigComponent } from './components/config/config.component';
import { ProductoVariedadComponent } from './components/productos/producto-variedad/producto-variedad.component';
import { ProductoGaleriaComponent } from './components/productos/producto-galeria/producto-galeria.component';
import { DescuentoListComponent } from './components/descuento/descuento-list/descuento-list.component';
import { DescuentoFormComponent } from './components/descuento/descuento-form/descuento-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent, canActivate: [adminGuard]},
  {
    path:'panel', children: [
      {path: 'clientes', component: ClientesListComponent, canActivate: [adminGuard]},
      {path: 'clientes/registro', component: ClientesFormComponent, canActivate: [adminGuard]},
      {path: 'clientes/registro/:id', component: ClientesFormComponent, canActivate: [adminGuard]},
      {path: 'cupones', component: CuponListComponent, canActivate: [adminGuard]},
      {path: 'cupones/registro', component: CuponFormComponent, canActivate: [adminGuard]},
      {path: 'cupones/registro/:id', component: CuponFormComponent, canActivate: [adminGuard]},
      {path: 'productos', component: ProductosListComponent, canActivate: [adminGuard]},
      {path: 'productos/registro', component: ProductosFormComponent, canActivate: [adminGuard]},
      {path: 'productos/registro/:id', component: ProductosFormComponent, canActivate: [adminGuard]},
      {path: 'productos/inventario/:id', component: InventarioComponent, canActivate: [adminGuard]},
      {path: 'configuraciones', component: ConfigComponent, canActivate: [adminGuard]},
      {path: 'productos/variedad/:id', component: ProductoVariedadComponent, canActivate: [adminGuard]},
      {path: 'productos/galeria/:id', component: ProductoGaleriaComponent, canActivate: [adminGuard]},
      {path: 'descuentos', component: DescuentoListComponent, canActivate: [adminGuard]},
      {path: 'descuentos/registro', component: DescuentoFormComponent, canActivate: [adminGuard]},
      {path: 'descuentos/registro/:id', component: DescuentoFormComponent, canActivate: [adminGuard]},

    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
