import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './components/clientes/clientes-form/clientes-form.component';
import { CuponListComponent } from './components/cupon/cupon-list/cupon-list.component';
import { CuponFormComponent } from './components/cupon/cupon-form/cupon-form.component';

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
      {path: 'cupones/registro/:id', component: CuponFormComponent, canActivate: [adminGuard]}
    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
